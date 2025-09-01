"use client";

import React, { useState } from "react";

type SecurityHeaders = Record<string, string>;
type SecurityApiReport = {
  headers?: SecurityHeaders;
  score?: string;
  [key: string]: unknown;
};
type SecurityResult = {
  https: boolean;
  headers?: SecurityHeaders;
  issues: string[];
  apiReport?: SecurityApiReport;
};

export default function Page() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SecurityResult | null>(null);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const issues: string[] = [];
  let headers: SecurityHeaders = {};
  let apiReport: SecurityApiReport | undefined = undefined;
      let https = false;
      try {
        const u = new URL(url);
        https = u.protocol === "https:";
        if (!https) issues.push("Site does not use HTTPS.");
      } catch {
        setError("Invalid URL");
        setLoading(false);
        return;
      }

      // Try to get headers via securityheaders.com API (CORS proxy)
      try {
        const apiUrl = `https://securityheaders.com/?q=${encodeURIComponent(url)}&followRedirects=on&hide=on&json`;
        const resp = await fetch(apiUrl);
        if (resp.ok) {
          apiReport = await resp.json();
          if (apiReport && apiReport['headers']) {
            headers = apiReport['headers'];
            // Check for common security headers
            const required = [
              "content-security-policy",
              "strict-transport-security",
              "x-content-type-options",
              "x-frame-options",
              "x-xss-protection",
              "referrer-policy",
              "permissions-policy"
            ];
            for (const h of required) {
              if (!headers[h]) {
                issues.push(`Missing header: ${h}`);
              }
            }
          }
        } else {
          issues.push("Could not fetch security headers (API error)");
        }
      } catch {
        issues.push("Could not fetch security headers (network error)");
      }

  setResult({ https, headers, issues, apiReport });
      } catch (err) {
        setError("Failed to check security: " + (err instanceof Error ? err.message : String(err)));
    }
    setLoading(false);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>
        Security Check
      </h1>
      <p style={{ color: "#475569", marginBottom: 24 }}>
        Enter a URL to check for advanced security issues (HTTPS, headers, and more).
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
          {loading ? "Scanning..." : "Scan"}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {result && (
        <div style={{ marginTop: 24 }}>
          <h2 style={{ color: '#2563eb', fontWeight: 600, fontSize: '1.2rem', marginBottom: 8 }}>Results for: <span style={{ color: '#334155' }}>{url}</span></h2>
          <ul style={{ color: '#64748b', marginBottom: 12 }}>
            <li>HTTPS: <b style={{ color: result.https ? '#22c55e' : '#ef4444' }}>{result.https ? 'Yes' : 'No'}</b></li>
            {result.issues.length === 0 ? (
              <li style={{ color: '#22c55e' }}>No major issues found!</li>
            ) : (
              result.issues.map((issue, i) => <li key={i} style={{ color: '#ef4444' }}>{issue}</li>)
            )}
          </ul>
          {result.headers && (
            <details style={{ marginBottom: 8 }}>
              <summary style={{ cursor: 'pointer', color: '#2563eb', fontWeight: 500 }}>Show Response Headers</summary>
              <pre style={{ fontSize: 13, background: '#f1f5f9', padding: 12, borderRadius: 8, overflowX: 'auto' }}>{JSON.stringify(result.headers, null, 2)}</pre>
            </details>
          )}
          {result.apiReport && result.apiReport['score'] && (
            <div style={{ color: '#2563eb', fontWeight: 500, marginTop: 8 }}>SecurityHeaders.com Grade: <b>{result.apiReport['score']}</b></div>
          )}
        </div>
      )}
    </div>
  );
}
