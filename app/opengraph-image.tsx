import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social share card, generated at build time by Next.js — no design tool round
 * trip and no binary asset to keep in sync with the brand tokens.
 */
export const runtime = "nodejs";
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(circle at 80% 8%, rgba(0,168,240,0.28) 0%, rgba(10,13,18,0) 58%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              border: "4px solid #00a8f0",
              display: "flex",
            }}
          />
          <div
            style={{
              color: "#ffffff",
              fontSize: 32,
              fontWeight: 700,
              letterSpacing: "-0.01em",
              display: "flex",
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              color: "#5fc8f7",
              fontSize: 21,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Hydraulics · Material handling · Refrigeration
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 960,
              display: "flex",
            }}
          >
            We repair the equipment your operation runs on.
          </div>
        </div>

        <div style={{ color: "#b0b9c4", fontSize: 24, display: "flex", gap: 24 }}>
          <span>{site.contact.address.city}, {site.contact.address.region}</span>
          <span style={{ color: "#414c58" }}>|</span>
          <span>{site.contact.mobileDisplay}</span>
        </div>
      </div>
    ),
    size,
  );
}
