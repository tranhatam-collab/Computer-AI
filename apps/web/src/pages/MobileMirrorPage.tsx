import { useState } from "react";
import { MobileAppMirror } from "../components/MobileAppMirror";

interface Props {
  locale?: "vi" | "en";
}

export function MobileMirrorPage({ locale = "vi" }: Props) {
  const [style, setStyle] = useState<"ios" | "android">("ios");

  return (
    <section className="section mobile-mirror-section">
      <div className="container">
        <div className="section-head">
          <h2>{locale === "vi" ? "Phản chiếu ứng dụng di động" : "Mobile App Mirror"}</h2>
          <p>{locale === "vi" ? "Trải nghiệm giao diện di động ngay trên trình duyệt." : "Experience the mobile UI directly in your browser."}</p>
        </div>
        <div className="mirror-toggle">
          <button className={`mirror-btn ${style === "ios" ? "active" : ""}`} onClick={() => setStyle("ios")}>
            iOS
          </button>
          <button className={`mirror-btn ${style === "android" ? "active" : ""}`} onClick={() => setStyle("android")}>
            Android
          </button>
        </div>
        <div className="mirror-stage">
          <div className={`phone-frame ${style}`}>
            <div className="phone-notch" />
            <div className="phone-screen">
              <MobileAppMirror style={style} locale={locale} />
            </div>
            <div className="phone-home-bar" />
          </div>
        </div>
      </div>
    </section>
  );
}
