"use client";
import React, { useState, useRef } from "react";

const DEVICES = [
  // Apple iPhones
  { name: "iPhone 15 Pro", width: 393, height: 852 },
  { name: "iPhone 15", width: 390, height: 844 },
  { name: "iPhone 14 Pro", width: 393, height: 852 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "iPhone 13 Pro", width: 390, height: 844 },
  { name: "iPhone 13", width: 390, height: 844 },
  { name: "iPhone 12 Pro", width: 390, height: 844 },
  { name: "iPhone 12", width: 390, height: 844 },
  { name: "iPhone 11 Pro", width: 375, height: 812 },
  { name: "iPhone 11", width: 414, height: 896 },
  { name: "iPhone SE (2022)", width: 375, height: 667 },
  { name: "iPhone XR", width: 414, height: 896 },
  { name: "iPhone 8", width: 375, height: 667 },
  { name: "iPhone 7", width: 375, height: 667 },
  // Android Phones
  { name: "Pixel 8 Pro", width: 412, height: 915 },
  { name: "Pixel 8", width: 412, height: 915 },
  { name: "Pixel 7 Pro", width: 412, height: 892 },
  { name: "Pixel 7", width: 412, height: 915 },
  { name: "Pixel 6 Pro", width: 412, height: 915 },
  { name: "Pixel 6", width: 412, height: 915 },
  { name: "Samsung Galaxy S24 Ultra", width: 412, height: 915 },
  { name: "Samsung Galaxy S24", width: 360, height: 800 },
  { name: "Samsung Galaxy S23 Ultra", width: 412, height: 915 },
  { name: "Samsung Galaxy S23", width: 360, height: 800 },
  { name: "Samsung Galaxy S22", width: 360, height: 800 },
  { name: "Samsung Galaxy Note 20", width: 412, height: 915 },
  { name: "OnePlus 12", width: 412, height: 915 },
  { name: "OnePlus 9", width: 412, height: 915 },
  // iPads/Tablets
  { name: "iPad Pro 12.9", width: 1024, height: 1366 },
  { name: "iPad Pro 11", width: 834, height: 1194 },
  { name: "iPad Air", width: 820, height: 1180 },
  { name: "iPad Mini", width: 768, height: 1024 },
  { name: "Samsung Galaxy Tab S9", width: 800, height: 1280 },
  { name: "Surface Pro 9", width: 912, height: 1368 },
  // Desktop/Laptop
  { name: "MacBook Pro 16", width: 1536, height: 960 },
  { name: "MacBook Air 13", width: 1440, height: 900 },
  { name: "Surface Laptop 5", width: 1024, height: 768 },
  { name: "Desktop 4K", width: 2560, height: 1440 },
  { name: "Desktop 1440p", width: 1440, height: 900 },
  { name: "Desktop 1080p", width: 1920, height: 1080 },
  { name: "Desktop 720p", width: 1280, height: 720 },
  { name: "Old Desktop 1024x768", width: 1024, height: 768 },
  { name: "Old Desktop 800x600", width: 800, height: 600 },
];

const BROWSERS = [
  { name: "Chrome", icon: "🟦" },
  { name: "Safari", icon: "🟦" },
  { name: "Firefox", icon: "🟧" },
  { name: "Edge", icon: "🟦" },
];



export default function ResponsivePreview({ url }: { url: string }) {
  const [iframeError, setIframeError] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedDevices, setSelectedDevices] = useState([DEVICES[0].name]);
  const device = DEVICES.find(d => d.name === selectedDevices[0]) || DEVICES[0];
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Always reset error and reload iframe on device/url change
  React.useEffect(() => {
    setIframeError(false);
  }, [device.name, url]);

  function handleDeviceChange(e: React.ChangeEvent<HTMLInputElement>, name: string) {
    if (e.target.checked) {
      setSelectedDevices([name]);
      setIframeError(false);
    }
  }

  // Only allow preview for https URLs or localhost
  let canPreview = false;
  if (url) {
    try {
      const u = new window.URL(url);
      canPreview = u.protocol === "https:" || u.hostname === "localhost" || u.hostname === "127.0.0.1";
    } catch {
      canPreview = false;
    }
  }

  // Fit preview to screen width (max 100%)
  const fitWidth = Math.min(device.width, typeof window !== 'undefined' ? window.innerWidth - 64 : device.width);
  const fitHeight = Math.round(device.height * (fitWidth / device.width));

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{ display: "flex", flexDirection: 'column', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: "#334155" }}>Device Model:</span>
          <input
            type="text"
            placeholder="Search device..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: '0.4rem 0.8rem',
              border: '1.5px solid #cbd5e1',
              borderRadius: 6,
              fontSize: '1rem',
              minWidth: 180,
              outline: 'none',
              background: '#f8fafc',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
          {DEVICES.filter(d => d.name.toLowerCase().includes(search.toLowerCase())).map(d => (
            <label key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500, color: selectedDevices[0] === d.name ? '#2563eb' : '#222', cursor: 'pointer', background: selectedDevices[0] === d.name ? '#e0e7ff' : '#f1f5f9', borderRadius: 6, padding: '0.3rem 0.8rem', marginRight: 4 }}>
              <input
                type="radio"
                name="device"
                checked={selectedDevices[0] === d.name}
                onChange={e => handleDeviceChange(e, d.name)}
                style={{ accentColor: '#2563eb' }}
              />
              {d.name}
            </label>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginBottom: 24 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontWeight: 500, marginBottom: 8 }}>{device.name}</div>
          <div
            style={{
              border: "2px solid #e5e7eb",
              borderRadius: 12,
              overflow: "visible",
              background: "#fff",
              boxShadow: "0 2px 16px 0 rgba(30,64,175,0.07)",
              marginBottom: 8,
              width: fitWidth,
              height: fitHeight,
              display: 'block',
              maxWidth: '100vw',
              maxHeight: '90vh',
              padding: 0,
            }}
          >
            {canPreview && !iframeError ? (
              <iframe
                key={device.name + url}
                ref={iframeRef}
                title={device.name}
                src={url}
                width={fitWidth}
                height={fitHeight}
                style={{
                  border: "none",
                  background: "#f8fafc",
                  display: "block",
                  width: fitWidth,
                  height: fitHeight,
                }}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
                onError={() => setIframeError(true)}
              />
            ) : (
              <div style={{ color: '#64748b', fontSize: 15, padding: 24, textAlign: 'center' }}>
                {iframeError
                  ? 'Could not load this site in the preview. It may block embedding or be unavailable.'
                  : 'Preview is only available for HTTPS sites or localhost.'}
              </div>
            )}
          </div>
          <div style={{ color: "#64748b", fontSize: 13 }}>
            {device.width} × {device.height}
          </div>
        </div>
      </div>
    </div>
  );
}
