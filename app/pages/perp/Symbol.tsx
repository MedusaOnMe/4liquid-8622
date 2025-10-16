import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { API } from "@orderly.network/types";
import { TradingPage } from "@orderly.network/trading";
import { updateSymbol } from "@/utils/storage";
import { formatSymbol, generatePageTitle } from "@/utils/utils";
import { useOrderlyConfig } from "@/utils/config";
import { getPageMeta } from "@/utils/seo";
import { renderSEOTags } from "@/utils/seo-tags";

export default function PerpSymbol() {
  const params = useParams();
  const [symbol, setSymbol] = useState(params.symbol!);
  const config = useOrderlyConfig();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Set default layout preferences on first load
  useEffect(() => {
    // Set both layout keys based on localStorage inspection
    const advancedLayoutKey = 'orderly_horizontal_markets_layout';
    const marketsLayoutKey = 'orderly_order_entry_side_markets_layout';

    const existingAdvanced = localStorage.getItem(advancedLayoutKey);
    const existingMarkets = localStorage.getItem(marketsLayoutKey);

    if (!existingAdvanced) {
      // Advanced panel: default to "left"
      localStorage.setItem(advancedLayoutKey, '"left"');
    }

    if (!existingMarkets) {
      // Markets panel: default to "top"
      localStorage.setItem(marketsLayoutKey, '"top"');
    }
  }, []);

  useEffect(() => {
    updateSymbol(symbol);
  }, [symbol]);

  const onSymbolChange = useCallback(
    (data: API.Symbol) => {
      const symbol = data.symbol;
      setSymbol(symbol);
      
      const searchParamsString = searchParams.toString();
      const queryString = searchParamsString ? `?${searchParamsString}` : '';
      
      navigate(`/perp/${symbol}${queryString}`);
    },
    [navigate, searchParams]
  );

  const pageMeta = getPageMeta();
  const pageTitle = generatePageTitle(formatSymbol(params.symbol!));

  return (
    <>
      {renderSEOTags(pageMeta, pageTitle)}
      <TradingPage
        symbol={symbol}
        onSymbolChange={onSymbolChange}
        tradingViewConfig={config.tradingPage.tradingViewConfig}
        sharePnLConfig={config.tradingPage.sharePnLConfig}
      />
    </>
  );
}

