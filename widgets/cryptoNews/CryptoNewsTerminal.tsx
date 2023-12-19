'use client';

import "./newsTerminal.css";
import { useState, useEffect, useRef } from "react"
import axios from "axios";
import Moment from 'react-moment';

import Pagenation from "@/components/Pagenation";

interface propsType {
  widgeTitle?: string;
}

const CryptoNewsTerminal = ({ widgeTitle }: propsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newsList, setNewsList] = useState<any[]>([]);
  const [apiErr, setApiErr] = useState("");

  const dropWrapperRef = useRef<null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getData = async () => {
    axios.get('/api/widgets/cryptonews', {
      params: {
        currentPage
      }
    }).then(({ data }) => {
      setNewsList(data.results)
    }).catch((err) => {
      // console.error(err.message);
      setApiErr(err.message);
    })
  }

  useEffect(() => {
    getData();
  }, [currentPage])

  useEffect(() => {
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (dropWrapperRef.current && !dropWrapperRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropWrapperRef]);

  return (
    <div className="w-full h-full overflow-clip">
      {/* widget header */}
      <div className='flex justify-between items-center px-3 h-[50px]'>
        <div className='font-semibold'>{widgeTitle || "Nerva News Terminal"}</div>
        <div className="flex gap-2">
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
        </div>
      </div>
      {/* widget body */}
      <div className="px-3 pt-3 h-[calc(100%-100px)]">
        <div className="px-3 h-full overflow-y-auto scroll-div">
          <div className="border-t border-gray-500/50"></div>
          {
            newsList.length > 0 && newsList.map((news, i) =>
              <div key={i} className="text-xs border-b border-gray-500/50 py-3 flex justify-between">
                <div className="flex gap-3">
                  <div className="text-gray-500 w-20">
                    <Moment fromNow>{news.published_at}</Moment>
                  </div>
                  <div className="">
                    <div className="flex flex-wrap pb-2">
                      <div className="pr-2">{`${(news.title).slice(0, 80)} ${news.title.length > 80 ? "..." : ""}`}</div>
                      <div className="flex gap-1 items-start">
                        <img src="/icons/Chat.svg" className="mt-1" alt="" />
                        <a href={news.url} target="_blank" className="text-gray-300">{news.domain}</a>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {
                        news.votes.liked > 0 &&
                        <button className="flex gap-1">
                          <img src="/icons/Thumb-up.svg" width={14} alt="rise" />
                          {news.votes.liked}
                        </button>
                      }
                      {
                        news.votes.positive > 0 &&
                        <button className="flex gap-1">
                          <img src="/icons/Rising.svg" width={14} alt="rise" />
                          {news.votes.positive}
                        </button>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 text-green-main">
                  {
                    news.currencies && news?.currencies.map((currency: any, ci: any) =>
                      <div key={ci}>{currency.code}</div>
                    )
                  }
                </div>
              </div>
            )
          }
          {
            apiErr && newsList.length === 0 &&
            <div className="text-center py-5">
              {apiErr}
              <div className="underline text-yellow-400 cursor-pointer" onClick={() => getData()}>refresh</div>
            </div>
          }
        </div>
      </div>
      <Pagenation
        maxPages={10}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default CryptoNewsTerminal;