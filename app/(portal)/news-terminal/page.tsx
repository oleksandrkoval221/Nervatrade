import CryptoNewsTerminal from "@/widgets/cryptoNews/CryptoNewsTerminal";
import CryptoPriceAlert from "@/widgets/cryptoPriceAlert/CryptoPriceAlert";
import TwitterFeedWidget from "@/widgets/twitterFeed/TwitterFeedWidget";
import SettingWidget from "@/widgets/settingWidget/SettingWidget";

export default function NewsTerminal() {
  return (
    <div className="mx-auto w-full h-screen relative">
      <div className="w-full h-16 px-4 flex items-center border-b border-b-gray-border">
        <h2 className="font-medium text-lg text-[#626D7C]">News Terminal</h2>
      </div>
      <div className="w-full h-full grid xl:grid-cols-12 pt-16 absolute top-0 left-0 right-0 bottom-0">
        <div className="h-full overflow-auto xl:col-span-4">
          <CryptoNewsTerminal />
        </div>
        <div className="h-full overflow-auto xl:col-span-5">
          {/* <div className="h-[calc(100%-198px)] rounded-lg bg-dark-second"> */}
            <TwitterFeedWidget />
          {/* </div> */}
          {/* <div className="mt-4 rounded-lg bg-dark-second">
            <SettingWidget />
          </div> */}
        </div>
        <div className="h-full overflow-auto xl:col-span-3">
          <CryptoPriceAlert />
        </div>
      </div>
    </div>
  );
}
