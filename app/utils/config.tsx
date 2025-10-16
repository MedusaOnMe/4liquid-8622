import { useMemo } from "react";
import { useTranslation } from "@orderly.network/i18n";
import { TradingPageProps } from "@orderly.network/trading";
import { BottomNavProps, FooterProps, MainNavWidgetProps } from "@orderly.network/ui-scaffold";
import { AppLogos } from "@orderly.network/react-app";
import { OrderlyActiveIcon, OrderlyIcon } from "../components/icons/orderly";
import { withBasePath } from "./base-path";
import { PortfolioActiveIcon, PortfolioInactiveIcon, TradingActiveIcon, TradingInactiveIcon, LeaderboardActiveIcon, LeaderboardInactiveIcon, MarketsActiveIcon, MarketsInactiveIcon, useScreen, Flex, cn } from "@orderly.network/ui";
import { getRuntimeConfig, getRuntimeConfigBoolean, getRuntimeConfigNumber } from "./runtime-config";
import { Link } from "react-router-dom";
import CustomLeftNav from "@/components/CustomLeftNav";

interface MainNavItem {
  name: string;
  href: string;
  target?: string;
}

interface ColorConfigInterface {
  upColor?: string;
  downColor?: string;
  pnlUpColor?: string;
  pnlDownColor?: string;
  chartBG?: string;
}

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    footerProps: FooterProps;
    bottomNavProps: BottomNavProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
  };
};

const ALL_MENU_ITEMS = [
  { name: "Trading", href: "/", translationKey: "common.trading" },
  { name: "Portfolio", href: "/portfolio", translationKey: "common.portfolio" },
  { name: "Markets", href: "/markets", translationKey: "common.markets" },
  { name: "Swap", href: "/swap", translationKey: "extend.swap" },
  { name: "Rewards", href: "/rewards", translationKey: "tradingRewards.rewards" },
  { name: "Leaderboard", href: "/leaderboard", translationKey: "tradingLeaderboard.leaderboard" },
  { name: "Vaults", href: "/vaults", translationKey: "common.vaults" },
];

const DEFAULT_ENABLED_MENUS = [
  { name: "Trading", href: "/", translationKey: "common.trading" },
  { name: "Portfolio", href: "/portfolio", translationKey: "common.portfolio" },
  { name: "Markets", href: "/markets", translationKey: "common.markets" },
  { name: "Swap", href: "/swap", translationKey: "extend.swap" },
  { name: "Leaderboard", href: "/leaderboard", translationKey: "tradingLeaderboard.leaderboard" },
];

const getCustomMenuItems = (): MainNavItem[] => {
  const customMenusEnv = getRuntimeConfig('VITE_CUSTOM_MENUS');
  
  if (!customMenusEnv || typeof customMenusEnv !== 'string' || customMenusEnv.trim() === '') {
    return [];
  }
  
  try {
    // Parse delimiter-separated menu items
    // Expected format: "Documentation,https://docs.example.com;Blog,https://blog.example.com;Support,https://support.example.com"
    const menuPairs = customMenusEnv.split(';').map(pair => pair.trim()).filter(pair => pair.length > 0);
    
    const validCustomMenus: MainNavItem[] = [];
    
    for (const pair of menuPairs) {
      const [name, href] = pair.split(',').map(item => item.trim());
      
      if (!name || !href) {
        console.warn("Invalid custom menu item format. Expected 'name,url':", pair);
        continue;
      }
      
      validCustomMenus.push({
        name,
        href,
        target: "_blank",
      });
    }
    
    return validCustomMenus;
  } catch (e) {
    console.warn("Error parsing VITE_CUSTOM_MENUS:", e);
    return [];
  }
};

const getEnabledMenus = () => {
  const enabledMenusEnv = getRuntimeConfig('VITE_ENABLED_MENUS');
  
  if (!enabledMenusEnv || typeof enabledMenusEnv !== 'string' || enabledMenusEnv.trim() === '') {
    return DEFAULT_ENABLED_MENUS;
  }
  
  try {
    const enabledMenuNames = enabledMenusEnv.split(',').map(name => name.trim());
    
    const enabledMenus = [];
    for (const menuName of enabledMenuNames) {
      const menuItem = ALL_MENU_ITEMS.find(item => item.name === menuName);
      if (menuItem) {
        enabledMenus.push(menuItem);
      }
    }
    
    return enabledMenus.length > 0 ? enabledMenus : DEFAULT_ENABLED_MENUS;
  } catch (e) {
    console.warn("Error parsing VITE_ENABLED_MENUS:", e);
    return DEFAULT_ENABLED_MENUS;
  }
};

const getPnLBackgroundImages = (): string[] => {
  const useCustomPnL = getRuntimeConfigBoolean('VITE_USE_CUSTOM_PNL_POSTERS');
  
  if (useCustomPnL) {
    const customPnLCount = getRuntimeConfigNumber('VITE_CUSTOM_PNL_POSTER_COUNT');
    
    if (isNaN(customPnLCount) || customPnLCount < 1) {
      return [
        withBasePath("/pnl/poster_bg_1.png"),
        withBasePath("/pnl/poster_bg_2.png"),
        withBasePath("/pnl/poster_bg_3.png"),
        withBasePath("/pnl/poster_bg_4.png"),
      ];
    }
    
    const customPosters: string[] = [];
    for (let i = 1; i <= customPnLCount; i++) {
      customPosters.push(withBasePath(`/pnl/poster_bg_${i}.webp`));
    }
    
    return customPosters;
  }
  
  return [
    withBasePath("/pnl/poster_bg_1.png"),
    withBasePath("/pnl/poster_bg_2.png"),
    withBasePath("/pnl/poster_bg_3.png"),
    withBasePath("/pnl/poster_bg_4.png"),
  ];
};

const getBottomNavIcon = (menuName: string) => {
  switch (menuName) {
    case "Trading":
      return { activeIcon: <TradingActiveIcon />, inactiveIcon: <TradingInactiveIcon /> };
    case "Portfolio":
      return { activeIcon: <PortfolioActiveIcon />, inactiveIcon: <PortfolioInactiveIcon /> };
    case "Leaderboard":
      return { activeIcon: <LeaderboardActiveIcon />, inactiveIcon: <LeaderboardInactiveIcon /> };
    case "Markets":
      return { activeIcon: <MarketsActiveIcon />, inactiveIcon: <MarketsInactiveIcon /> };
    default:
      throw new Error(`Unsupported menu name: ${menuName}`);
  }
};

const getColorConfig = (): ColorConfigInterface | undefined => {
  const customColorConfigEnv = getRuntimeConfig('VITE_TRADING_VIEW_COLOR_CONFIG');
  
  if (!customColorConfigEnv || typeof customColorConfigEnv !== 'string' || customColorConfigEnv.trim() === '') {
    return undefined;
  }
  
  try {
    const customColorConfig = JSON.parse(customColorConfigEnv);
    return customColorConfig;
  } catch (e) {
    console.warn("Error parsing VITE_TRADING_VIEW_COLOR_CONFIG:", e);
    return undefined;
  }
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  return useMemo<OrderlyConfig>(() => {
    const enabledMenus = getEnabledMenus();
    const customMenus = getCustomMenuItems();
    
    const translatedEnabledMenus = enabledMenus.map(menu => ({
      name: t(menu.translationKey),
      href: menu.href,
    }));
    
    const allMenuItems = [...translatedEnabledMenus, ...customMenus];
    
    const supportedBottomNavMenus = ["Trading", "Portfolio", "Markets", "Leaderboard"];
    const bottomNavMenus = enabledMenus
      .filter(menu => supportedBottomNavMenus.includes(menu.name))
      .map(menu => {
        const icons = getBottomNavIcon(menu.name);
        return {
          name: t(menu.translationKey),
          href: menu.href,
          ...icons
        };
      })
      .filter(menu => menu.activeIcon && menu.inactiveIcon);

    const mainNavProps: MainNavWidgetProps = {
      initialMenu: "/",
      mainMenus: allMenuItems,
    };

    if (getRuntimeConfigBoolean('VITE_ENABLE_CAMPAIGNS')) {
      mainNavProps.campaigns = {
        name: "$ORDER",
        href: "/rewards",
        children: [
          {
            name: t("extend.staking"),
            href: "https://app.orderly.network/staking",
            description: t("extend.staking.description"),
            icon: <OrderlyIcon size={14} />,
            activeIcon: <OrderlyActiveIcon size={14} />,
            target: "_blank",
          },
        ],
      };
    }

    mainNavProps.customRender = (components) => {
      return (
        <Flex justify="between" className="oui-w-full">
          <Flex
            itemAlign={"center"}
            className={cn(
              "oui-gap-3",
              "oui-overflow-hidden",
            )}
          >
            { isMobile && 
              <CustomLeftNav
                menus={translatedEnabledMenus}
                externalLinks={customMenus}
              />
            }
            <Link to="/">
              {isMobile && getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
                ? <img src={withBasePath("/logo-secondary.webp")} alt="logo" style={{ height: "32px" }} />
                : components.title}
            </Link>
            {components.mainNav}
            {!isMobile && getRuntimeConfig('VITE_TWITTER_URL') && (
              <a
                href={getRuntimeConfig('VITE_TWITTER_URL')}
                target="_blank"
                rel="noopener noreferrer"
                className="oui-flex oui-items-center oui-ml-2 oui-text-base-contrast-54 hover:oui-text-base-contrast-98 oui-transition-colors"
                aria-label="Follow us on X"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="m4.42 4.73 4.633 6.194-4.662 5.037H5.44l4.082-4.41 3.298 4.41h3.57l-4.893-6.543 4.34-4.689h-1.05l-3.759 4.062-3.037-4.062zm1.543.772h1.64l7.244 9.686h-1.64z"></path>
                </svg>
              </a>
            )}
          </Flex>

          <Flex itemAlign={"center"} className="oui-gap-2">
            {/* Connected Status Indicator */}
            {!isMobile && (
              <div className="oui-flex oui-items-center oui-gap-1 oui-mr-2">
                <svg width="18" height="18" viewBox="0 0 18 18" className="oui-fill-success-light" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M9.02092 2.92969C6.18562 2.92969 3.51037 4.13854 1.68502 6.18754C1.40947 6.49676 1.446 6.96671 1.75537 7.24218C2.0646 7.51743 2.53447 7.48143 2.81002 7.17183C4.35112 5.44196 6.6141 4.42969 9.02092 4.42969C11.4205 4.42969 13.6369 5.43123 15.185 7.17183C15.4603 7.48143 15.9301 7.51743 16.2397 7.24218C16.5492 6.96694 16.5853 6.49699 16.31 6.18754C14.4787 4.12856 11.8512 2.92969 9.02092 2.92969ZM9.02092 5.92969C7.04092 5.92969 5.20867 6.78461 3.93502 8.25019C3.6633 8.56294 3.6927 9.03318 4.00537 9.30468C4.31797 9.57618 4.7883 9.54693 5.06002 9.23418C6.05175 8.09343 7.47982 7.42968 9.02092 7.42968C10.5348 7.42968 11.9446 8.08144 12.935 9.18769C13.2113 9.49593 13.681 9.51093 13.9897 9.23418C14.2983 8.95818 14.3364 8.48793 14.06 8.17968C12.7879 6.75896 10.9659 5.92969 9.02092 5.92969ZM9.02092 8.92968C7.91917 8.92968 6.89242 9.40218 6.18502 10.2189C5.91375 10.5317 5.94225 11.0019 6.25537 11.2734C6.56835 11.5449 7.03875 11.5164 7.31002 11.2029C7.73542 10.7124 8.3589 10.4297 9.02092 10.4297C9.6684 10.4297 10.2604 10.7072 10.685 11.1797C10.962 11.4879 11.4552 11.5037 11.7631 11.2262C12.0712 10.9494 12.087 10.4799 11.81 10.1717C11.1037 9.38643 10.0983 8.92968 9.02092 8.92968ZM8.99752 11.9297C8.81609 11.9297 8.64374 12.0047 8.50537 12.1404C8.50537 12.1404 7.3935 13.2362 6.95842 13.6637C6.52342 14.0919 6.7968 14.9319 7.49752 14.9297H9.63037H10.4975C11.1864 14.9319 11.477 14.0739 11.0366 13.6404C10.5961 13.2069 9.51322 12.1404 9.51314 12.1404C9.37469 12.0047 9.17894 11.9297 8.99752 11.9297Z"></path>
                </svg>
                <span className="oui-text-2xs oui-text-success-light">Connected</span>
              </div>
            )}
            {components.accountSummary}
            {components.linkDevice}
            {components.scanQRCode}
            {components.languageSwitcher}
            {components.subAccount}
            {components.chainMenu}
            {components.walletConnect}
          </Flex>
        </Flex>
      )
    };

    return {
      scaffold: {
        mainNavProps,
        bottomNavProps: {
          mainMenus: bottomNavMenus,
        },
        footerProps: {
          telegramUrl: getRuntimeConfig('VITE_TELEGRAM_URL') || undefined,
          discordUrl: getRuntimeConfig('VITE_DISCORD_URL') || undefined,
          twitterUrl: getRuntimeConfig('VITE_TWITTER_URL') || undefined,
          trailing: <span className="oui-text-2xs oui-text-base-contrast-54">Charts powered by <a href="https://tradingview.com" target="_blank" rel="noopener noreferrer">TradingView</a></span>
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main:
            getRuntimeConfigBoolean('VITE_HAS_PRIMARY_LOGO')
              ? { component: <img src={withBasePath("/logo.webp")} alt="logo" style={{ height: "42px" }} /> }
              : { img: withBasePath("/orderly-logo.svg") },
          secondary: {
            img: getRuntimeConfigBoolean('VITE_HAS_SECONDARY_LOGO')
              ? withBasePath("/logo-secondary.webp")
              : withBasePath("/orderly-logo-secondary.svg"),
          },
        },
      },
      tradingPage: {
        tradingViewConfig: {
          scriptSRC: withBasePath("/tradingview/charting_library/charting_library.js"),
          library_path: withBasePath("/tradingview/charting_library/"),
          customCssUrl: withBasePath("/tradingview/chart.css"),
          colorConfig: getColorConfig(),
        },
        sharePnLConfig: {
          backgroundImages: getPnLBackgroundImages(),
          color: "rgba(255, 255, 255, 0.98)",
          profitColor: "rgba(41, 223, 169, 1)",
          lossColor: "rgba(245, 97, 139, 1)",
          brandColor: "rgba(255, 255, 255, 0.98)",
          // ref
          refLink: typeof window !== 'undefined' ? window.location.origin : undefined,
          refSlogan: getRuntimeConfig('VITE_ORDERLY_BROKER_NAME') || "Orderly Network",
        },
      },
    };
  }, [t, isMobile]);
};
