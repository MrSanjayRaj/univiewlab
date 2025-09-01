"use client";

import React, { useState } from "react";

type SeoResult = {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  og?: Record<string, string>;
  twitter?: Record<string, string>;
  headings?: { tag: string; text: string }[];
  issues: string[];
};

export default function Page() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SeoResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const resp = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);
      if (!resp.ok) throw new Error("Could not fetch page");
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const issues: string[] = [];
      const title = doc.querySelector("title")?.textContent || "";
      if (!title) issues.push("Missing <title> tag");
      const description = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
      if (!description) issues.push("Missing meta description");
      const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
      const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
      // Open Graph
      const og: Record<string, string> = {};
      doc.querySelectorAll('meta[property^="og:"]').forEach(m => {
        const prop = m.getAttribute("property");
        if (prop) og[prop] = m.getAttribute("content") || "";
      });
      // Twitter Card
      const twitter: Record<string, string> = {};
      doc.querySelectorAll('meta[name^="twitter:"]').forEach(m => {
        const name = m.getAttribute("name");
        if (name) twitter[name] = m.getAttribute("content") || "";
      });
      // Headings
      const headings: { tag: string; text: string }[] = [];
      doc.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
        headings.push({ tag: h.tagName, text: h.textContent || "" });
      });
      if (headings.length === 0) issues.push("No headings (h1-h6) found");
      setResult({ title, description, canonical, robots, og, twitter, headings, issues });
    } catch (err: any) {
      setError("Failed to analyze SEO: " + err?.message);
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>
        SEO Analysis
      </h1>
      <p style={{ color: "#475569", marginBottom: 24 }}>
        Enter a URL to analyze its SEO performance (title, meta, Open Graph, headings, and more).
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <input
          type="url"
          required
          placeholder="https://your-site.com or http://localhost:3000"
          value={url}
          onChange={e => setUrl(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            border: "1.5px solid #cbd5e1",
            borderRadius: 8,
            fontSize: "1rem",
            outline: "none",
            background: "#f8fafc",
            transition: "border 0.2s",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: loading ? "#a5b4fc" : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px 0 rgba(37,99,235,0.08)",
            transition: "background 0.2s",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 24 }}>
          <h2 style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.2rem', marginBottom: 8 }}>Results for: <span style={{ color: '#334155' }}>{url}</span></h2>
          <ul style={{ color: '#64748b', marginBottom: 12 }}>
            <li>Title: <b style={{ color: result.title ? '#22c55e' : '#ef4444' }}>{result.title || 'Missing'}</b></li>
            <li>Description: <b style={{ color: result.description ? '#22c55e' : '#ef4444' }}>{result.description || 'Missing'}</b></li>
            <li>Canonical: <b style={{ color: result.canonical ? '#22c55e' : '#ef4444' }}>{result.canonical || 'Missing'}</b></li>
            <li>Robots: <b style={{ color: result.robots ? '#22c55e' : '#ef4444' }}>{result.robots || 'Missing'}</b></li>
            {result.issues.length === 0 ? (
              <li style={{ color: '#22c55e' }}>No major SEO issues found!</li>
            ) : (
              result.issues.map((issue, i) => <li key={i} style={{ color: '#ef4444' }}>{issue}</li>)
            )}
          </ul>
          {result.og && Object.keys(result.og).length > 0 && (
            <details style={{ marginBottom: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 500 }}>Show Open Graph Tags</summary>
              <pre style={{ fontSize: 13, background: '#f1f5f9', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(result.og, null, 2)}</pre>
            </details>
          )}
          {result.twitter && Object.keys(result.twitter).length > 0 && (
            <details style={{ marginBottom: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 500 }}>Show Twitter Card Tags</summary>
              <pre style={{ fontSize: 13, background: '#f1f5f9', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(result.twitter, null, 2)}</pre>
            </details>
          )}
          {result.headings && result.headings.length > 0 && (
            <details style={{ marginBottom: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 500 }}>Show Headings Structure</summary>
              <ul style={{ fontSize: 14, background: '#f8fafc', padding: 12, borderRadius: 8, color: '#334155' }}>
                {result.headings.map((h, i) => (
                  <li key={i}><b>{h.tag}:</b> {h.text}</li>
                ))}
              </ul>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
