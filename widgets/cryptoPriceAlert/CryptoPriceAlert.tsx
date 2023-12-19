'use client';

import { useState, useEffect } from "react"
import axios from "axios";

import Coin from './Coin';

interface propsType {
  widgeTitle?: string;
}

const CryptoPriceAlert = ({ widgeTitle }: propsType) => {
  const [coins, setCoins] = useState([]);
  const [apiErr, setApiErr] = useState("");

  const getData = async () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(({ data }) => setCoins(data))
      .catch(err => setApiErr(err.message))
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="w-full h-full overflow-clip">
      {/* widget header */}
      <div className='flex justify-between items-center px-3 h-[50px]'>
        <div className='font-semibold'>{widgeTitle || "Price Alert"}</div>
        <div className="flex gap-2">
          <div className="relative">

          </div>
          <div></div>
        </div>
      </div>
      {/* widget body */}
      <div className="px-3 pt-3 h-[calc(100%-100px)]">
        <div className="px-3 h-full overflow-y-auto overflow-x-hidden scroll-div">
          <div className="border-b border-gray-500/20"></div>
          {
            coins.length > 0 &&
            coins.map((coin: any) =>
              <Coin key={coin.id} name={coin.name} image={coin.image}
                symbol={coin.symbol} marketcap={coin.market_cap}
                price={coin.current_price}
                priceChange={coin.price_change_percentage_24h}
                volume={coin.total_volume} />
            )
          }
          {
            apiErr && coins.length === 0 && <div className="text-center py-5">
              {apiErr}
              <div className="underline text-yellow-400 cursor-pointer" onClick={() => getData()}>refresh</div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CryptoPriceAlert;