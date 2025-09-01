"use client";

import React, { useState } from "react";
import ResponsivePreview from "@/components/ResponsivePreview";

export default function Page() {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>
        Device & Browser Preview
      </h1>
      <p style={{ color: "#475569", marginBottom: 24 }}>
        Enter a URL to preview it in different devices and browsers.
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
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.75rem 1.5rem",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(37,99,235,0.08)",
            transition: "background 0.2s",
          }}
        >
          Preview
        </button>
      </form>
      {submitted && url && (
        <ResponsivePreview url={url} />
      )}
    </div>
  );
}
