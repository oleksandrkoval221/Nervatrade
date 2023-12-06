'use client';

import { useState, useEffect, useRef } from "react"
import Pagenation from "@/components/Pagenation";

interface propsType {
  widgeTitle?: string;
}

const TwitterFeedWidget = ({ widgeTitle }: propsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dropWrapperRef = useRef<null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

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
        <div className='font-semibold'>{widgeTitle || "Tweets of Twitter Feed"}</div>
        <div className="flex gap-2">
          <div className="relative text-sm" ref={dropWrapperRef}>
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center justify-center gap-2 border border-gray-500 rounded-md px-3 py-1"
            >
              Custom #1
              <img src={'/icons/Arrow-round-bottom.svg'} alt="Icondown" />
            </button>
            {
              openDropdown &&
              <div className="absolute top-15 right-0 z-40 w-full bg-dark-main border border-gray-500">
                <div className='relative z-50'>
                  <div className="px-3 py-1 cursor-pointer hover:text-green-main">Custom #1</div>
                  <div className="px-3 py-1 cursor-pointer hover:text-green-main">Custom #2</div>
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
          {
            new Array(10).fill(0).map((val, i) =>
              <div key={i} className={`flex gap-2 p-3 mb-2 ${i % 2 === 0 && 'bg-dark-modal'}`}>
                <div className="flex-none w-10 h-10">
                  <img src="/users/user1.png" className="w-full h-full rounded-full" alt="avater" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h1>Whale Alert</h1> <small className="text-gray-300">@whale_alert</small>
                  </div>
                  <p className="text-xs text-gray-300">Funds inexplicably relocated from a concealed purse to an unfamiliar location, </p>
                  <div className="flex gap-3 mt-1">
                    <button className="px-2 pb-1 rounded text-xs bg-dark-btn">Long</button>
                    <button className="px-2 pb-1 rounded text-xs border border-dark-btn">Short</button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <Pagenation
          maxPages={10}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default TwitterFeedWidget;