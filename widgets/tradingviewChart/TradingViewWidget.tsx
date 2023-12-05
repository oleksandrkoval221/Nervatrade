import React, { useEffect, useRef } from 'react';

interface propsType {
  widgeTitle?: string;
}

let tvScriptLoadingPromise: any;

export default function TradingViewWidget({ widgeTitle }: propsType) {
  const onLoadScriptRef = useRef<any | null>(null);

  useEffect(
    // @ts-ignore
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_d7af5') && 'TradingView' in window) {
          // @ts-ignore
          new window.TradingView.widget({
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_d7af5"
          });
        }
      }
    },
    []
  );

  return (
      <div className='tradingview-widget-container px-2' style={{ height: "100%", width: "100%" }}>
        <div className='flex justify-between items-center px-3 h-[50px]'>
          <div className='font-semibold'>{widgeTitle || "Trading Chart"}</div>
          <div></div>
        </div>
        <div id='tradingview_d7af5' style={{ height: "calc(100% - 80px)", width: "100%" }} />
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a>
        </div>
      </div>
  );
}
