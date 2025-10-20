import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Droplets, Waves, Zap, ArrowRight, Globe } from "lucide-react";
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

  const handleSpotTrading = () => {
    navigate('/spot');
  };

  const handleCopyCA = async () => {
    // Coming Soon - no copy functionality
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
        {/* Liquid Background */}
        <div className="landing-bg">
          <div className="landing-liquid-orb landing-liquid-orb-1"></div>
          <div className="landing-liquid-orb landing-liquid-orb-2"></div>
          <div className="landing-liquid-orb landing-liquid-orb-3"></div>
          <div className="landing-liquid-orb landing-liquid-orb-4"></div>
          <div className="landing-ripple-grid"></div>

          {/* Liquid Bubbles */}
          <div className="landing-bubbles">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="landing-bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${6 + Math.random() * 8}s`,
                  width: `${10 + Math.random() * 30}px`,
                  height: `${10 + Math.random() * 30}px`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Section - Split Layout */}
        <div className="landing-hero">
          {/* Left Side - Branding */}
          <div className="landing-hero-left">
            <div className="landing-brand">
              <img src="/logo.webp" alt="Percoliquid" className="landing-brand-logo" />
              <div className="landing-brand-title">
                <h1 className="landing-brand-name">
                  {"Percoliquid".split("").map((char, i) => (
                    <span key={i} className="landing-letter" style={{ animationDelay: `${i * 0.08}s` }}>
                      {char}
                    </span>
                  ))}
                </h1>
                <div className="landing-brand-tagline">
                  <Droplets className="landing-tagline-icon" size={18} />
                  <span>Liquid DeFi Trading</span>
                </div>
              </div>
            </div>

            <p className="landing-hero-description">
              Flow into the future of decentralized finance. Trade perpetuals and spot with unprecedented liquidity on Solana.
            </p>

            {/* Stats Grid */}
            <div className="landing-stats">
              <div className="landing-stat">
                <Zap className="landing-stat-icon" size={20} />
                <div className="landing-stat-content">
                  <div className="landing-stat-value">{'<'}50ms</div>
                  <div className="landing-stat-label">Execution</div>
                </div>
              </div>
              <div className="landing-stat">
                <Waves className="landing-stat-icon" size={20} />
                <div className="landing-stat-content">
                  <div className="landing-stat-value">Deep</div>
                  <div className="landing-stat-label">Liquidity</div>
                </div>
              </div>
              <div className="landing-stat">
                <Globe className="landing-stat-icon" size={20} />
                <div className="landing-stat-content">
                  <div className="landing-stat-value">100x</div>
                  <div className="landing-stat-label">Leverage</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - CTA Card */}
          <div className="landing-hero-right">
            <div className="landing-cta-card">
              <div className="landing-cta-card-header">
                <h2 className="landing-cta-card-title">Start Trading</h2>
                <p className="landing-cta-card-subtitle">Choose your trading mode</p>
              </div>

              <div className="landing-cta-buttons">
                <button onClick={handleEnterApp} className="landing-cta-primary">
                  <div className="landing-cta-content">
                    <div className="landing-cta-label">Perpetuals</div>
                    <div className="landing-cta-desc">Trade with leverage</div>
                  </div>
                  <ArrowRight className="landing-cta-icon" size={24} />
                </button>

                <button onClick={handleSpotTrading} className="landing-cta-secondary">
                  <div className="landing-cta-content">
                    <div className="landing-cta-label">Spot</div>
                    <div className="landing-cta-desc">Instant swaps</div>
                  </div>
                  <ArrowRight className="landing-cta-icon" size={24} />
                </button>
              </div>

              {/* CA Section */}
              <div className="landing-ca-section">
                <div className="landing-ca-divider">
                  <span>Contract Address</span>
                </div>
                <div className="landing-ca-button landing-ca-coming-soon">
                  <span className="landing-ca-text">Coming Soon</span>
                </div>
              </div>

              {/* Social */}
              <div className="landing-social">
                <a
                  href="https://x.com/PercoLiquid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-social-link"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span>Follow us on X</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

