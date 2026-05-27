export interface BrowserSearchRequest {
  query: string;
  limit?: number;
}

export interface BrowserSearchResult {
  title: string;
  url: string;
  snippet: string;
}

export interface BrowserSearchResponse {
  results: BrowserSearchResult[];
  totalResults?: number;
}

export interface BrowserBrowseRequest {
  url: string;
  timeoutMs?: number;
}

export interface BrowserBrowseResponse {
  url: string;
  title: string;
  description?: string;
  bodyText: string;
  links: { text: string; href: string }[];
  status: number;
}

export interface BrowserScrapeRequest {
  url: string;
  selector: string;
  attribute?: string;
  timeoutMs?: number;
}

export interface BrowserScrapeResponse {
  url: string;
  selector: string;
  matches: string[];
}

export interface BrowserFetchRequest {
  url: string;
  timeoutMs?: number;
  maxRedirects?: number;
  maxBytes?: number;
}

export interface BrowserFetchResponse {
  url: string;
  status: number;
  headers: Record<string, string>;
  text: string;
}

export interface BrowserAutomationProvider {
  readonly kind: "fetch-based" | "playwright" | "mock";
  readonly configured: boolean;
  search(req: BrowserSearchRequest): Promise<BrowserSearchResponse>;
  browse(req: BrowserBrowseRequest): Promise<BrowserBrowseResponse>;
  scrape(req: BrowserScrapeRequest): Promise<BrowserScrapeResponse>;
  fetch(req: BrowserFetchRequest): Promise<BrowserFetchResponse>;
}

// ── SSRF / private IP guards ──

import dns from "node:dns/promises";

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => isNaN(n) || n < 0 || n > 255)) return false;
  const [a, b] = parts;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 127) return true;
  if (a === 0) return true;
  if (a === 169 && b === 254) return true; // link-local
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower.startsWith("fe80:") || lower.startsWith("fc00:") || lower.startsWith("fd00:")) return true;
  return false;
}

function isPrivateIP(ip: string): boolean {
  return isPrivateIPv4(ip) || isPrivateIPv6(ip);
}

async function resolveHost(urlStr: string): Promise<string> {
  const url = new URL(urlStr);
  const hostname = url.hostname;
  // If already an IP, return it directly
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(hostname) || /^[0-9a-fA-F:]+$/.test(hostname)) {
    return hostname;
  }
  try {
    const { address } = await dns.lookup(hostname);
    return address;
  } catch {
    throw new Error(`DNS resolution failed for ${hostname}`);
  }
}

function assertPublicUrl(urlStr: string): void {
  const url = new URL(urlStr);
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error(`Protocol not allowed: ${url.protocol}`);
  }
  // localhost string guard (fast path before DNS)
  if (url.hostname === "localhost" || url.hostname.endsWith(".localhost")) {
    throw new Error(`Host not allowed: ${url.hostname}`);
  }
}

async function assertPublicHost(urlStr: string): Promise<void> {
  assertPublicUrl(urlStr);
  const resolvedIP = await resolveHost(urlStr);
  if (isPrivateIP(resolvedIP)) {
    throw new Error(`Resolved IP is private/reserved: ${resolvedIP}`);
  }
}

// ── Mock Provider ──

export class MockBrowserProvider implements BrowserAutomationProvider {
  readonly kind = "mock";
  readonly configured = true;

  async search(req: BrowserSearchRequest): Promise<BrowserSearchResponse> {
    return {
      results: [
        { title: `Mock result for "${req.query}"`, url: "https://example.com/1", snippet: "Simulated search result 1" },
        { title: `Mock result for "${req.query}"`, url: "https://example.com/2", snippet: "Simulated search result 2" },
      ],
      totalResults: 2,
    };
  }

  async browse(req: BrowserBrowseRequest): Promise<BrowserBrowseResponse> {
    return {
      url: req.url,
      title: "Mock Page",
      description: "Simulated browse result",
      bodyText: `Simulated body text for ${req.url}`,
      links: [{ text: "Mock link", href: "https://example.com/mock" }],
      status: 200,
    };
  }

  async scrape(req: BrowserScrapeRequest): Promise<BrowserScrapeResponse> {
    return {
      url: req.url,
      selector: req.selector,
      matches: [`Mock content for selector "${req.selector}" at ${req.url}`],
    };
  }

  async fetch(req: BrowserFetchRequest): Promise<BrowserFetchResponse> {
    return {
      url: req.url,
      status: 200,
      headers: { "content-type": "text/html" },
      text: `<html><head><title>Mock</title></head><body>Mock fetch for ${req.url}</body></html>`,
    };
  }
}

// ── Real Provider (fetch-based, no external browser engine) ──

export class RealBrowserProvider implements BrowserAutomationProvider {
  readonly kind = "fetch-based";
  readonly configured: boolean;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.configured = !!apiKey;
  }

  private async safeFetch(initialUrl: string, timeoutMs = 15000, maxRedirects = 5): Promise<Response> {
    await assertPublicHost(initialUrl);

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    let redirects = 0;
    let currentUrl = initialUrl;

    try {
      while (redirects <= maxRedirects) {
        const res = await fetch(currentUrl, {
          redirect: "manual",
          signal: controller.signal,
          headers: { "User-Agent": "ComputerIAI-Bot/1.0" },
        });

        if (res.status >= 300 && res.status < 400) {
          const location = res.headers.get("location");
          if (!location) break;
          const nextUrl = new URL(location, currentUrl).toString();
          await assertPublicHost(nextUrl); // SSRF guard on redirect target
          redirects++;
          if (redirects > maxRedirects) {
            throw new Error("Max redirects exceeded");
          }
          currentUrl = nextUrl;
          continue;
        }

        // Attach final resolved URL so callers know where we landed
        Object.defineProperty(res, "url", { value: currentUrl });
        return res;
      }
      throw new Error("Max redirects exceeded");
    } finally {
      clearTimeout(timer);
    }
  }

  async search(req: BrowserSearchRequest): Promise<BrowserSearchResponse> {
    if (!this.configured) {
      throw new Error("Search API key not configured");
    }
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(req.query)}&count=${req.limit || 10}`;
    const res = await this.safeFetch(url, 15000);
    if (!res.ok) {
      throw new Error(`Search API error: ${res.status}`);
    }
    const data = await res.json() as any;
    const results = (data.web?.results || []).map((r: any) => ({
      title: r.title || "",
      url: r.url || "",
      snippet: r.description || "",
    }));
    return { results, totalResults: data.web?.totalResults };
  }

  async browse(req: BrowserBrowseRequest): Promise<BrowserBrowseResponse> {
    const res = await this.safeFetch(req.url, req.timeoutMs || 15000);
    const text = await res.text();
    const titleMatch = text.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
    const links: { text: string; href: string }[] = [];
    const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>([^<]*)<\/a>/gi;
    let m;
    while ((m = linkRegex.exec(text)) !== null) {
      links.push({ href: m[1], text: m[2].trim() });
    }
    return {
      url: (res as any).url || req.url,
      title: titleMatch?.[1]?.trim() || "",
      description: descMatch?.[1],
      bodyText: text.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().substring(0, 10000),
      links: links.slice(0, 100),
      status: res.status,
    };
  }

  async scrape(req: BrowserScrapeRequest): Promise<BrowserScrapeResponse> {
    const res = await this.safeFetch(req.url, req.timeoutMs || 15000);
    const text = await res.text();
    const matches: string[] = [];
    const escaped = req.selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`<[^>]*${escaped}[^>]*>([^<]*)<\\/[^>]+>`, "gi");
    let m;
    while ((m = regex.exec(text)) !== null) {
      matches.push(m[1].trim());
    }
    return { url: (res as any).url || req.url, selector: req.selector, matches };
  }

  async fetch(req: BrowserFetchRequest): Promise<BrowserFetchResponse> {
    const res = await this.safeFetch(req.url, req.timeoutMs || 15000, req.maxRedirects || 5);
    let text = await res.text();
    if (req.maxBytes && text.length > req.maxBytes) {
      text = text.substring(0, req.maxBytes) + "\n...[truncated]";
    }
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => { headers[k] = v; });
    return { url: (res as any).url || req.url, status: res.status, headers, text };
  }
}
