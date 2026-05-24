/**
 * Output packager — packages run outputs into structured artifacts.
 */

import type { RunOutput, RunArtifact } from "./run.js";

export function packageOutput(body: string, format: string, options?: {
  title?: string;
  artifacts?: Partial<RunArtifact>[];
  confidence?: number;
}): RunOutput {
  const timestamp = Date.now();
  const artifacts: RunArtifact[] = (options?.artifacts || []).map((a, i) => ({
    id: a.id || `art_${timestamp}_${i}`,
    type: a.type || "generic",
    title: a.title || `Output ${i + 1}`,
    url: a.url,
    mimeType: a.mimeType || "text/plain",
  }));

  return {
    body,
    format,
    confidence: options?.confidence || 0.5,
    artifacts,
  };
}

export function extractSections(body: string): string[] {
  return body.split(/\n#{1,3}\s+/).filter(Boolean);
}

export function formatAsMarkdown(body: string, title: string): string {
  return `# ${title}\n\n${body}`;
}

export function formatAsHTML(body: string, title: string): string {
  const html = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");
  return `<html><head><title>${title}</title></head><body>${html}</body></html>`;
}
