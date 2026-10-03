import { ImageResponse } from "next/og";

export const alt =
  "Liz Candelo Grueso — poeta, narradora e investigadora cultural del Pacífico colombiano";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PHOTO_URL =
  "https://lizcandelo.andresmorales.com.co/portrait/liz-candelo.jpg";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#F6F2E8",
          position: "relative",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Sun disc behind the photo */}
        <div
          style={{
            position: "absolute",
            right: "60px",
            top: "50%",
            transform: "translateY(-50%)",
            width: "560px",
            height: "560px",
            borderRadius: "9999px",
            background: "#ECA81D",
            display: "flex",
          }}
        />

        {/* Photo */}
        <img
          src={PHOTO_URL}
          alt=""
          width="380"
          height="570"
          style={{
            position: "absolute",
            right: "150px",
            top: "50%",
            transform: "translateY(-50%)",
            objectFit: "cover",
            borderRadius: "4px",
            boxShadow: "0 30px 80px -20px rgba(17,17,17,0.35)",
          }}
        />

        {/* Left text block */}
        <div
          style={{
            position: "absolute",
            left: "80px",
            top: "160px",
            display: "flex",
            flexDirection: "column",
            width: "560px",
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#DF5A2B",
              letterSpacing: 4,
              marginBottom: 28,
              fontFamily: "system-ui, sans-serif",
              textTransform: "uppercase",
            }}
          >
            Poesía · Pacífico colombiano
          </div>
          <div
            style={{
              fontSize: 88,
              color: "#111111",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Liz</span>
            <span style={{ fontStyle: "italic", color: "#B8321B" }}>
              Candelo
            </span>
            <span>Grueso</span>
          </div>
          <div
            style={{
              marginTop: 36,
              fontSize: 26,
              color: "#111111",
              fontStyle: "italic",
              display: "flex",
            }}
          >
            «La casa más grande del mundo»
          </div>
          <div
            style={{
              marginTop: 14,
              fontSize: 18,
              color: "#111111",
              opacity: 0.55,
              fontFamily: "system-ui, sans-serif",
              display: "flex",
            }}
          >
            Nieta de Aquilino Grueso · Icono Editorial
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
