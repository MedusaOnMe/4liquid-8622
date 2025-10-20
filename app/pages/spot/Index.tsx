import { generatePageTitle } from "@/utils/utils";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";
import { useEffect, useRef } from "react";
import { init } from '@jup-ag/plugin';
import '@jup-ag/plugin/css';

export default function SpotIndex() {
  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle("Spot");
  const terminalInitialized = useRef(false);

  // Initialize Jupiter Plugin
  useEffect(() => {
    if (terminalInitialized.current) return;

    terminalInitialized.current = true;

    init({
      displayMode: "integrated",
      integratedTargetId: "jupiter-terminal-container",
      endpoint: "https://mainnet.helius-rpc.com/?api-key=3e8f5e8e-4b3a-4f3a-9e8e-3e8f5e8e4b3a",
      formProps: {
        initialAmount: "1",
        initialInputMint: "So11111111111111111111111111111111111111112", // SOL
        initialOutputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
      },
      strictTokenList: false,
      defaultExplorer: "Solscan",
    });
  }, []);

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <div className="spot-page-container">
        {/* Liquid Background */}
        <div className="spot-bg">
          <div className="spot-liquid-orb spot-liquid-orb-1"></div>
          <div className="spot-liquid-orb spot-liquid-orb-2"></div>
          <div className="spot-liquid-orb spot-liquid-orb-3"></div>
          <div className="spot-ripple-grid"></div>

          {/* Liquid Bubbles */}
          <div className="spot-bubbles">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="spot-bubble"
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

        {/* Content */}
        <div className="spot-content">
          <div className="spot-header">
            <h1 className="spot-title">Spot Trading</h1>
            <p className="spot-subtitle">Instant token swaps powered by Jupiter</p>
          </div>

          {/* Jupiter Terminal Container */}
          <div
            id="jupiter-terminal-container"
            className="spot-terminal-wrapper"
          />
        </div>
      </div>
    </>
  );
}
