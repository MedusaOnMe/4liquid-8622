import { generatePageTitle } from "@/utils/utils";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";
import { useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

// Declare Jupiter global type
declare global {
  interface Window {
    Jupiter?: {
      init: (config: {
        displayMode: "integrated" | "modal" | "widget";
        integratedTargetId: string;
        endpoint?: string;
        passThroughWallet?: boolean;
        formProps?: {
          initialAmount?: string;
          initialInputMint?: string;
          initialOutputMint?: string;
        };
        strictTokenList?: boolean;
        defaultExplorer?: string;
      }) => void;
      syncProps?: (props: { passthroughWalletContextState: any }) => void;
      close?: () => void;
      resume?: () => void;
    };
  }
}

export default function SpotIndex() {
  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle("Spot");
  const wallet = useWallet();
  const [isTerminalReady, setIsTerminalReady] = useState(false);
  const terminalInitialized = useRef(false);

  // Initialize Jupiter Terminal
  useEffect(() => {
    // Wait for Jupiter script to load
    const checkJupiter = setInterval(() => {
      if (window.Jupiter && !terminalInitialized.current) {
        clearInterval(checkJupiter);

        try {
          window.Jupiter.init({
            displayMode: "integrated",
            integratedTargetId: "jupiter-terminal-container",
            endpoint: "https://api.mainnet-beta.solana.com",
            passThroughWallet: true,
            formProps: {
              initialAmount: "1",
              initialInputMint: "So11111111111111111111111111111111111111112", // SOL
              initialOutputMint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
            },
            strictTokenList: false,
            defaultExplorer: "Solscan",
          });

          terminalInitialized.current = true;
          setIsTerminalReady(true);
        } catch (error) {
          console.error("Failed to initialize Jupiter Terminal:", error);
        }
      }
    }, 100);

    // Cleanup
    return () => {
      clearInterval(checkJupiter);
    };
  }, []);

  // Sync wallet state with Jupiter Terminal
  useEffect(() => {
    if (isTerminalReady && window.Jupiter?.syncProps) {
      window.Jupiter.syncProps({
        passthroughWalletContextState: wallet,
      });
    }
  }, [wallet, wallet.connected, wallet.publicKey, isTerminalReady]);

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <div className="w-full h-full flex flex-col items-center justify-center p-4 pt-8">
        {/* Jupiter Terminal Container */}
        <div
          id="jupiter-terminal-container"
          className="w-full max-w-[500px]"
          style={{ minHeight: "600px" }}
        />

        {!isTerminalReady && (
          <div className="flex items-center justify-center" style={{ minHeight: "600px" }}>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        )}
      </div>
    </>
  );
}
