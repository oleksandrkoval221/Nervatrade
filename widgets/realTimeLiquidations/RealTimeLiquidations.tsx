"use client";
import "./realtimeLiquidation.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import moment from "moment";

interface propsType {
  widgeTitle?: string;
}

const currencies = [
  "ALL",
  "BTC",
  "ETH",
  "LTC",
  "OP",
  "SUI",
  "DOGE",
  "SOL",
  "XRP",
  "ADA",
  "AVAX",
  "SHIB",
  "PEPE",
  "TON",
  "DOT",
  "LINK",
  "TRX",
  "MATIC",
  "BCH",
  "ICP",
  "NEAR",
  "UNI",
  "APT",
  "ATOM",
  "ARB",
];

const exchanges = [
  "ALL",
  "Binance",
  "Bitmex",
  "Ftx",
  "Kraken",
  "Huobi",
  "Bitfinex",
  "Deribit",
  "Bybit",
  "Okx",
  "Bitmart",
];

const values = [
  { value: 0, label: "All" },
  { value: 10000, label: "> 10K" },
  { value: 100000, label: "> 100K" },
  { value: 1000000, label: "> 1M" },
];

const RealTimeLiquidations = ({ widgeTitle }: propsType) => {
  const [liquidations, setLiquidations] = useState<any[]>([]);
  const [apiErr, setApiErr] = useState("");
  const [filter, setFilter] = useState({
    base: "All",
    exchange: "All",
    min_amount: 0,
  });

  const handleChange = (e: any) =>
    setFilter({ ...filter, [e.target.name]: e.target.value });

  const getData = async () => {
    axios
      .get("/api/widgets/realtimeliquidations", {
        params: { ...filter },
      })
      .then((res) => {
        setLiquidations(res.data.data);
      })
      .catch((err) => {
        console.error(err.message);
        setApiErr(err.message);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => getData(), 3000);
    return () => {
      clearInterval(interval);
    };
  }, [filter]);

  return (
    <div className="w-full h-full overflow-clip p-6 flex flex-col p-6 bg-black">
      {/* widget header */}
      <div className="grid gap-4">
        <div className="flex justify-center font-medium text-base">
          {widgeTitle || "Real-Time Liquidations"}
        </div>
        <div className="flex justify-between">
          <select
            value={filter.base}
            onChange={handleChange}
            name="base"
            className="h-8 rounded-lg bg-transparent border border-[#343B45] px-2 font-medium text-sm outline-none"
          >
            {currencies.map((currency, i) => (
              <option key={i} className="text-black">
                {currency}
              </option>
            ))}
          </select>
          <select
            value={filter.exchange}
            onChange={handleChange}
            name="exchange"
            className="h-8 rounded-lg bg-transparent border border-[#343B45] px-2 font-medium text-sm outline-none"
          >
            {exchanges.map((exchange, i) => (
              <option key={i} className="text-black">
                {exchange}
              </option>
            ))}
          </select>
          <select
            value={filter.min_amount}
            onChange={handleChange}
            name="min_amount"
            className="h-8 rounded-lg bg-transparent border border-[#343B45] px-2 font-medium text-sm outline-none"
          >
            {values.map((value) => (
              <option
                key={value.value}
                value={value.value}
                className="text-black"
              >
                {value.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* widget body */}
      <div className="overflow-y-auto scroll-div">
        <table className="w-full text-[#626D7C] border-separate border-spacing-y-2">
          <tr className="font-medium text-sm">
            <th className="text-left">Symbol</th>
            <th className="text-right">Price</th>
            <th className="text-right">Value</th>
            <th className="text-right">Time</th>
          </tr>
          {liquidations.length > 0 &&
            liquidations.map((liquidation, i) => (
              <tr key={i} className="font-semibold text-xs">
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      className="w-4"
                      src={`/exchanges/${liquidation.Exchange} Symbol.png`}
                    />
                    <span>{liquidation.MarketName}</span>
                  </div>
                </td>
                <td
                  className={`text-right ${
                    liquidation.Side === `Long`
                      ? `text-[#00823E]`
                      : `text-[#C32518]`
                  }`}
                >
                  ${Math.round(liquidation.Rate * 10000) / 10000}
                </td>
                <td
                  className={`text-right ${
                    liquidation.Side === `Long`
                      ? `text-[#00823E]`
                      : `text-[#C32518]`
                  }`}
                >
                  {Math.round(liquidation.Amount * 10000) / 10000}
                </td>
                <td className="text-right">
                  {moment.unix(liquidation.unixtime).format("hh:mm:ss")}
                </td>
              </tr>
            ))}
        </table>
        {apiErr && liquidations.length === 0 && (
          <div className="text-center py-5">
            {apiErr}
            <div
              className="underline text-yellow-400 cursor-pointer"
              onClick={() => getData()}
            >
              refresh
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeLiquidations;
