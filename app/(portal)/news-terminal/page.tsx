import CryptoNewsTerminal from "@/widgets/cryptoNews/CryptoNewsTerminal";
import CryptoPriceAlert from "@/widgets/cryptoPriceAlert/CryptoPriceAlert";
import TwitterFeedWidget from "@/widgets/twitterFeed/TwitterFeedWidget";

export default function NewsTerminal() {

  return (
    <div className="mx-auto w-full md:pl-5">
      <div className="w-full grid xl:grid-cols-12 gap-4">
        <div className="xl:col-span-5 xl:h-[calc(100vh-32px)]">
          <div className="h-[calc(100vh-30px)] flex justify-center items-center rounded-lg bg-dark-second">
            <CryptoNewsTerminal />
          </div>
        </div>
        <div className="xl:col-span-7 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="h-[calc(100vh-30px)] flex justify-center items-center rounded-lg bg-dark-second">
              <TwitterFeedWidget />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="h-[calc(100vh-30px)] flex justify-center items-center rounded-lg bg-dark-second">
              <CryptoPriceAlert />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
