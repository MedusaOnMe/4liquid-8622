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
        {/* Animated Background */}
        <div className="spot-bg">
          <div className="spot-gradient-orb spot-orb-1"></div>
          <div className="spot-gradient-orb spot-orb-2"></div>
          <div className="spot-gradient-orb spot-orb-3"></div>
          <div className="spot-grid"></div>

          {/* Particle Effects */}
          <div className="spot-particles">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="spot-particle"
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
        <div className="spot-content">
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
