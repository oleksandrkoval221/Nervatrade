import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/Button";
import ReactPlayer from 'react-player/youtube'

export const metadata: Metadata = {
  title: "Nervatrade | Home page",
  description: "Welcome to Financial Insights!",
};


export default async function Home() {
  return (
    <main>
      <div className="mx-auto max-w-container relative px-3 lg:px-16 pt-8 lg:pt-[72px] pb-[42px] lg:pb-[72px]">
        <div className="w-full max-w-[530px] z-10">
          <h2 className="font-semibold text-[32px] lg:text-[40px] leading-10 lg:leading-[1.3] mb-6 lg:mb-14 relative z-10">
            Professional Grade Crypto Trading Suite
          </h2>
          <p className="font-semibold text-xl lg:text-2xl text-[#626D7C] leading-7 lg:leading-8 mb-6 lg:mb-9 relative z-10">
            Aggregate your trading alpha with Custom Dashboards, Real Time News Terminal and Advanced Charting.
          </p>
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-5 mb-[62px] lg:mb-40 relative z-10">
            <Button className="w-full lg:w-auto">Start for free</Button>
            <Button className="w-full lg:w-auto" color="dark">
              <div className="flex justify-center items-center gap-2">
                <img src='/icons/light.svg' />
                <span>Preview</span>
              </div>
            </Button>
          </div>
          <div className="relative lg:absolute lg:top-0 lg:right-0 z-0 mb-[78px] lg:mb-0">
            <img src="/images/preview.png" className="scale-75 origin-right" />
            <ReactPlayer url="https://www.youtube.com/embed/3-iCDOYkfms?mute=0&controls=0&origin=https%3A%2F%2Fcookpete.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=1" className="w-[120px] lg:w-[200px] h-20 lg:h-[130px] absolute bottom-14 right-20" />
          </div>
          <ul className="flex justify-between lg:justify-start lg:gap-16 relative z-10">
            <li className="flex flex-col">  
              <span className="font-medium text-sm lg:text-base text-[#626D7C]">Users</span>
              <span className="font-semibold text-2xl text-white">5000+</span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium text-sm lg:text-base text-[#626D7C]">Data sources</span>
              <span className="font-semibold text-2xl text-white">10+</span>
            </li>
            <li className="flex flex-col">
              <span className="font-medium text-sm lg:text-base text-[#626D7C]">Barometers</span>
              <span className="font-semibold text-2xl text-white">100+</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-[#FFF]">
        <ul className="mx-auto max-w-container flex flex-col lg:flex-row items-center gap-12 lg:gap-8 p-16">
          <li className="w-full flex justify-center">
            <img src="/images/binance.svg" alt="Binance" />
          </li>
          <li className="w-full flex justify-center">
            <img src="/images/coinmarketcap.svg" alt="Coinmarketcap" />
          </li>
          <li className="w-full flex justify-center">
            <img src="/images/coinbase.svg" alt="Coinbase" />
          </li>
          <li className="w-full flex justify-center">
            <img src="/images/bybit.svg" alt="Bybit" />
          </li>
          <li className="w-full flex justify-center">
            <img src="/images/compound.svg" alt="Compound" />
          </li>
          <li className="w-full flex justify-center">
            <img src="/images/crypto.svg" alt="Crypto" />
          </li>
        </ul>
      </div>
      <div className="mx-auto max-w-container grid gap-12 lg:gap-14 px-3 lg:px-16 py-12 lg:py-[92px]">
        <div className="flex flex-col gap-4 items-start">
          <span className="h-5 flex items-center justify-center border border-[#343B45] rounded font-semibold text-xs leading-4 text-[#626D7C] px-1 bg-[#22262E]">
            Feature
          </span>
          <h2 className="font-semibold text-[28px] lg:text-[32px] leading-9 lg:leading-10">
            Platform that feels like it’s from the future...
          </h2>
          <p className="font-medium text-lg leading-7 text-[#626D7C]">
            Our cutting-edge platform seamlessly blends innovation and user-friendly design, offering you the best analytics for trading.
          </p>
        </div>
        <ul className="flex flex-col lg:flex-row gap-8">
          <li className="grid gap-4">
            <span className="block w-12 h-12 flex items-center justify-center rounded-full bg-[#151A1F]">
              <img src="/icons/charts.svg" alt="" />
            </span>
            <p className="font-semibold text-2xl leading-8 text-[#FFF]">
              Nerva Charts
            </p>
            <p className="font-medium text-lg leading-7 text-[#626D7C]">
              Elevate your trading strategies with our advanced charting platform with multi-split screening.
            </p>
            <Link href="/" className="flex items-center gap-2 text-[#4DF986]">
              <span className="font-semibold text-base">Learn more</span>
              <img src="/icons/arrow-right.svg" alt="" />
            </Link>
          </li>
          <li className="grid gap-4">
            <span className="block w-12 h-12 flex items-center justify-center rounded-full bg-[#151A1F]">
              <img src="/icons/dashboard.svg" alt="" />
            </span>
            <p className="font-semibold text-2xl leading-8 text-[#FFF]">
              Nerva Dashboard
            </p>
            <p className="font-medium text-lg leading-7 text-[#626D7C]">
              Easily manage your crypto trading barometers with our intuitive Drag and Drop Dashboard.
            </p>
            <Link href="/" className="flex items-center gap-2 text-[#4DF986]">
              <span className="font-semibold text-base">Learn more</span>
              <img src="/icons/arrow-right.svg" alt="" />
            </Link>
          </li>
          <li className="grid gap-4">
            <span className="block w-12 h-12 flex items-center justify-center rounded-full bg-[#151A1F]">
              <img src="/icons/terminal.svg" alt="" />
            </span>
            <p className="font-semibold text-2xl leading-8 text-[#FFF]">
              News Terminal
            </p>
            <p className="font-medium text-lg leading-7 text-[#626D7C]">
              Trade the market with real time news from sources that move the market.
            </p>
            <Link href="/" className="flex items-center gap-2 text-[#4DF986]">
              <span className="font-semibold text-base">Learn more</span>
              <img src="/icons/arrow-right.svg" alt="" />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
