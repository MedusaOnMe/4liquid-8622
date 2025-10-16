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

  const contractAddress = "0xdb698474f525cfd4eb9a9015788c7b91668a4444";

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
        </div>

        {/* Content */}
        <div className="landing-content">
          {/* Header with Logo and Social */}
          <div className="landing-header">
            <div className="landing-logo">
              <img src="/logo.webp" alt="4Liquid" className="landing-logo-img" />
            </div>
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

          {/* Title */}
          <h1 className="landing-title">
            <span className="landing-title-line">Trade the Future</span>
            <span className="landing-title-line landing-title-highlight">of DeFi</span>
          </h1>

          {/* Subtitle */}
          <p className="landing-subtitle">
            Experience lightning-fast perpetual trading with up to 100x leverage on BSC
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
              <Zap className="landing-feature-icon" size={32} strokeWidth={2} />
              <div className="landing-feature-text">Instant Execution</div>
            </div>
            <div className="landing-feature">
              <Shield className="landing-feature-icon" size={32} strokeWidth={2} />
              <div className="landing-feature-text">Secure Trading</div>
            </div>
            <div className="landing-feature">
              <TrendingUp className="landing-feature-icon" size={32} strokeWidth={2} />
              <div className="landing-feature-text">100x Leverage</div>
            </div>
          </div>

          {/* CA Button */}
          <button onClick={handleCopyCA} className="landing-ca-button">
            <span className="landing-ca-label">CA:</span>
            <span className="landing-ca-address">
              {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
            </span>
            {copied ? (
              <Check size={18} className="landing-ca-icon" />
            ) : (
              <Copy size={18} className="landing-ca-icon" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

