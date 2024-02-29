"use client";

import { useState, useEffect, useRef } from "react";
import Pagenation from "@/components/Pagenation";
import axios from "axios";
import Moment from "react-moment";

interface propsType {
  widgeTitle?: string;
}

const TwitterFeedWidget = ({ widgeTitle }: propsType) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tweets, setTweets] = useState<any[]>([]);
  const [apiErr, setApiErr] = useState("");

  const dropWrapperRef = useRef<null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      // @ts-ignore
      if (dropWrapperRef.current &&!dropWrapperRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropWrapperRef]);

  const getData = async () => {
    axios
      .get("/api/widgets/twittertweets", {
        params: {
          search: "crypto",
          limit: 20,
          id_only: false,
        },
      })
      .then(({ data }) => {
        setTweets(data);
      })
      .catch((err) => {
        console.error(err.message);
        setApiErr(err.message);
      });
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <div className="w-full h-full overflow-clip p-6 flex flex-col">
      {/* widget header */}
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-xl">{widgeTitle || "Feed"}</div>
        {/* <div className="flex gap-2">
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
        </div> */}
      </div>
      {/* widget body */}
      <div className="overflow-y-auto scroll-div">
        <div className="grid gap-4">
          {tweets.length > 0 &&
            tweets.map((tweet, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex-none w-10 h-10 m-1">
                  <img
                    src={tweet.user.profileImageUrl || `/users/user1.png`}
                    className="w-full h-full rounded-full"
                    alt="avater"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-6">
                    <h1 className="font-medium text-base">
                      {tweet.user.displayname}
                    </h1>
                    <div className="flex gap-2 font-medium text-sm text-[#626D7C]">
                      <span>@{tweet.user.username}</span>
                      <Moment format="MMM DD">{tweet.date}</Moment>
                    </div>
                  </div>
                  <p className="font-medium text-base">{tweet.rawContent}</p>
                  {/* <div className="flex gap-3 mt-1">
                  <button className="px-2 pb-1 rounded text-xs bg-dark-btn">
                    Long
                  </button>
                  <button className="px-2 pb-1 rounded text-xs border border-dark-btn">
                    Short
                  </button>
                </div> */}
                </div>
              </div>
            ))}
        </div>
        {apiErr && tweets.length === 0 && (
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

export default TwitterFeedWidget;
