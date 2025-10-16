import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Zap, Shield, TrendingUp, Copy, Check } from "lucide-react";
import { DEFAULT_SYMBOL } from "@/utils/storage";
import { getPageMeta } from "@/utils/seo";
import { getRuntimeConfig } from "@/utils/runtime-config";
import { renderSEOTags } from "@/utils/seo-tags";

export default function Index() {
  const navigate = useNavigate();
  const pageMeta = getPageMeta();
  const appName = getRuntimeConfig("VITE_APP_NAME");
  const appDescription = getRuntimeConfig("VITE_APP_DESCRIPTION");
  const [copied, setCopied] = useState(false);

  const handleEnterApp = () => {
    navigate(`/perp/${DEFAULT_SYMBOL}`);
  };

  const contractAddress = "0xd8949726cc656be0fa254c018dc8b3b0099e4444";

  const handleCopyCA = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
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

          {/* Particle Effects */}
          <div className="landing-particles">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="landing-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 12}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="landing-content">
          {/* Logo */}
          <div className="landing-header">
            <div className="landing-logo">
              <img src="/logo.webp" alt="4Liquid" className="landing-logo-img" />
            </div>
          </div>

          {/* Title with Character Animation */}
          <h1 className="landing-title">
            <span className="landing-title-line">
              {"Trade the Future".split("").map((char, i) => (
                <span key={i} className="landing-title-char" style={{ animationDelay: `${i * 0.05}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
            <span className="landing-title-line landing-title-highlight">
              {"of DeFi".split("").map((char, i) => (
                <span key={i} className="landing-title-char" style={{ animationDelay: `${(i + 15) * 0.05}s` }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle with Typing Effect */}
          <p className="landing-subtitle">
            Experience lightning-fast perpetual trading with up to <span className="landing-leverage-highlight">100x</span> leverage on BSC
          </p>

          {/* CTA Button and X Icon - Side by Side */}
          <div className="landing-cta-wrapper">
            <button onClick={handleEnterApp} className="landing-cta">
              <span className="landing-cta-glow"></span>
              <span className="landing-cta-text">Enter App</span>
              <svg className="landing-cta-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a
              href="https://x.com/4liquidbnb"
              target="_blank"
              rel="noopener noreferrer"
              className="landing-x-icon"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Features */}
          <div className="landing-features">
            <div className="landing-feature">
              <div className="landing-feature-icon-wrapper">
                <Zap className="landing-feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="landing-feature-text">Instant Execution</div>
            </div>
            <div className="landing-feature">
              <div className="landing-feature-icon-wrapper">
                <Shield className="landing-feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="landing-feature-text">Secure Trading</div>
            </div>
            <div className="landing-feature">
              <div className="landing-feature-icon-wrapper">
                <TrendingUp className="landing-feature-icon" size={32} strokeWidth={2} />
              </div>
              <div className="landing-feature-text">100x Leverage</div>
            </div>
          </div>

          {/* CA Button - Full Address */}
          <button onClick={handleCopyCA} className="landing-ca-button">
            <span className="landing-ca-label">CA:</span>
            <span className="landing-ca-address">{contractAddress}</span>
            {copied ? (
              <Check size={18} className="landing-ca-icon landing-ca-icon-copied" />
            ) : (
              <Copy size={18} className="landing-ca-icon" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

