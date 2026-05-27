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
  readonly kind: "search-api" | "playwright" | "mock";
  readonly configured: boolean;
  search(req: BrowserSearchRequest): Promise<BrowserSearchResponse>;
  browse(req: BrowserBrowseRequest): Promise<BrowserBrowseResponse>;
  scrape(req: BrowserScrapeRequest): Promise<BrowserScrapeResponse>;
  fetch(req: BrowserFetchRequest): Promise<BrowserFetchResponse>;
}

// ── Deny/allow lists ──

const DEFAULT_DENYLIST = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "169.254",
  "10.",
  "192.168.",
  "172.16.",
  "172.17.",
  "172.18.",
  "172.19.",
  "172.20.",
  "172.21.",
  "172.22.",
  "172.23.",
  "172.24.",
  "172.25.",
  "172.26.",
  "172.27.",
  "172.28.",
  "172.29.",
  "172.30.",
  "172.31.",
  "file://",
];

function isDenied(url: string): boolean {
  return DEFAULT_DENYLIST.some((d) => url.includes(d));
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
  readonly kind = "search-api";
  readonly configured: boolean;
  private apiKey?: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey;
    this.configured = !!apiKey;
  }

  private async safeFetch(url: string, timeoutMs = 15000, maxRedirects = 5): Promise<Response> {
    if (isDenied(url)) {
      throw new Error(`URL denied by security policy: ${url}`);
    }
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "ComputerIAI-Bot/1.0" },
      });
      if (res.redirected && maxRedirects <= 0) {
        throw new Error("Max redirects exceeded");
      }
      return res;
    } finally {
      clearTimeout(timer);
    }
  }

  async search(req: BrowserSearchRequest): Promise<BrowserSearchResponse> {
    if (!this.configured) {
      throw new Error("Search API key not configured");
    }
    // Brave Search API fallback contract
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
      url: req.url,
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
    // Simple regex-based selector matching for class/id/tag
    const escaped = req.selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`<[^>]*${escaped}[^>]*>([^<]*)<\\/[^>]+>`, "gi");
    let m;
    while ((m = regex.exec(text)) !== null) {
      matches.push(m[1].trim());
    }
    return { url: req.url, selector: req.selector, matches };
  }

  async fetch(req: BrowserFetchRequest): Promise<BrowserFetchResponse> {
    const res = await this.safeFetch(req.url, req.timeoutMs || 15000, req.maxRedirects || 5);
    let text = await res.text();
    if (req.maxBytes && text.length > req.maxBytes) {
      text = text.substring(0, req.maxBytes) + "\n...[truncated]";
    }
    const headers: Record<string, string> = {};
    res.headers.forEach((v, k) => { headers[k] = v; });
    return { url: req.url, status: res.status, headers, text };
  }
}
