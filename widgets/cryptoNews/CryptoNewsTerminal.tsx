"use client";

import "./newsTerminal.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import Pagenation from "@/components/Pagenation";

interface propsType {
  widgeTitle?: string;
}

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "a few seconds",
    ss: "%d s",
    m: "1 m",
    mm: "%d m",
    h: "1 h",
    hh: "%d h",
    d: "1 d",
    dd: "%d d",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const CryptoNewsTerminal = ({ widgeTitle }: propsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [apiErr, setApiErr] = useState("");

  const dropWrapperRef = useRef<null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getData = async () => {
    axios
      .get("/api/widgets/cryptonews", {
        params: {
          currentPage,
        },
      })
      .then(({ data }) => {
        setNewsList(data.results);
      })
      .catch((err) => {
        // console.error(err.message);
        setApiErr(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (dropWrapperRef.current && !dropWrapperRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropWrapperRef]);

  return (
    <div className="w-full h-full overflow-clip p-6 flex flex-col">
      {/* widget header */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-xl">
          {widgeTitle || "Latest News"}
        </div>
        {/* <div className="flex gap-2">
          <div className="relative text-sm" ref={dropWrapperRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center justify-center gap-2 border border-gray-500 rounded-md px-3 py-1"
            >
              Latest news
              <img src={'/icons/Arrow-round-bottom.svg'} alt="Icondown" />
            </button>
            {
              openDropdown &&
              <div className="absolute top-15 right-0 z-40 w-full bg-dark-main border border-gray-500">
                <div className='relative z-50'>
                  <div className="px-3 py-1 cursor-pointer hover:text-green-main" onClick={() => alert()}>Popularity</div>
                  <div className="px-3 py-1 cursor-pointer hover:text-green-main">Tags</div>
                </div>
              </div>
            }
          </div>
          <div></div>
        </div> */}
      </div>
      {/* widget body */}
      <div className="overflow-y-auto scroll-div">
        {newsList.length > 0 &&
          newsList.map((news, i) => (
            <div
              key={i}
              className="text-xs border-b border-gray-500/50 flex justify-between py-2"
            >
              <div className="flex">
                <div className="w-12 flex-shrink-0 font-medium text-base text-[#626D7C] text-center">
                  <Moment fromNow ago>
                    {news.published_at}
                  </Moment>
                </div>
                <div className="">
                  <div className="flex flex-col items-start font-medium text-base">
                    <div className="text-[#FFF] line-clamp-1">{news.title}</div>
                    <a
                      href={news.url}
                      target="_blank"
                      className="text-[#626D7C]"
                    >
                      {news.domain}
                    </a>
                  </div>
                  {/* <div className="flex gap-3">
                      {news.votes.liked > 0 && (
                        <button className="flex gap-1">
                          <img
                            src="/icons/Thumb-up.svg"
                            width={14}
                            alt="rise"
                          />
                          {news.votes.liked}
                        </button>
                      )}
                      {news.votes.positive > 0 && (
                        <button className="flex gap-1">
                          <img src="/icons/Rising.svg" width={14} alt="rise" />
                          {news.votes.positive}
                        </button>
                      )}
                    </div> */}
                </div>
              </div>
              <div className="flex-shrink-0 font-medium text-base text-right text-[#00823E] px-2 line-clamp-1">
                {news.currencies &&
                  news?.currencies
                    .map((currency: any) => currency.code)
                    .join(", ")}
              </div>
            </div>
          ))}
        {apiErr && newsList.length === 0 && (
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
      <div className="pt-5">
        <Pagenation
          maxPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CryptoNewsTerminal;
