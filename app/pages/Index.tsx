import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DEFAULT_SYMBOL } from "@/utils/storage";
import { getPageMeta } from "@/utils/seo";
import { getRuntimeConfig } from "@/utils/runtime-config";
import { renderSEOTags } from "@/utils/seo-tags";

export default function Index() {
  const navigate = useNavigate();
  const pageMeta = getPageMeta();
  const appName = getRuntimeConfig("VITE_APP_NAME");
  const appDescription = getRuntimeConfig("VITE_APP_DESCRIPTION");

  const handleEnterApp = () => {
    navigate(`/perp/${DEFAULT_SYMBOL}`);
  };

  return (
    <>
      {renderSEOTags(pageMeta, appName || undefined)}
      {appDescription && (
        <Helmet>
          <meta name="description" content={appDescription} />
        </Helmet>
      )}

      <div className="landing-page">
        {/* Animated Background */}
        <div className="landing-bg">
          <div className="landing-gradient-orb landing-orb-1"></div>
          <div className="landing-gradient-orb landing-orb-2"></div>
          <div className="landing-gradient-orb landing-orb-3"></div>
          <div className="landing-grid"></div>
        </div>

        {/* Content */}
        <div className="landing-content">
          {/* Logo */}
          <div className="landing-logo">
            <img src="/logo.webp" alt="4Liquid" className="landing-logo-img" />
          </div>

          {/* Title */}
          <h1 className="landing-title">
            <span className="landing-title-line">Trade the Future</span>
            <span className="landing-title-line landing-title-highlight">of DeFi</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-subtitle">
            Experience lightning-fast perpetual trading with up to 20x leverage on BSC
          </p>

          {/* CTA Button */}
          <button onClick={handleEnterApp} className="landing-cta">
            <span className="landing-cta-text">Enter App</span>
            <svg className="landing-cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Features */}
          <div className="landing-features">
            <div className="landing-feature">
              <div className="landing-feature-icon">⚡</div>
              <div className="landing-feature-text">Instant Execution</div>
            </div>
            <div className="landing-feature">
              <div className="landing-feature-icon">🔒</div>
              <div className="landing-feature-text">Secure Trading</div>
            </div>
            <div className="landing-feature">
              <div className="landing-feature-icon">📈</div>
              <div className="landing-feature-text">20x Leverage</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

