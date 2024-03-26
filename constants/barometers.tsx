import CryptoNewsTerminal from "@/widgets/cryptoNews/CryptoNewsTerminal";
import TradingViewWidget from "@/widgets/tradingviewChart/TradingViewWidget";
import TwitterFeedWidget from "@/widgets/twitterFeed/TwitterFeedWidget";

const baralist = [
  {
    _id: "1",
    name: "Interest Rate",
    component: <>Interest Rate</>
  }, {
    _id: "2",
    name: "Bitcoin Dominance",
    component: <>Bitcoin Dominance</>
  }, {
    _id: "3",
    name: "Heatmap",
    component: <>Heatmap</>
  }, {
    _id: "4",
    name: "Order Flow",
    component: <>Order Flow</>
  }, {
    _id: "5",
    name: "Trading Chart",
    component: <TradingViewWidget />
  },
  {
    _id: "6",
    name: "Twitter Feed",
    component: <TwitterFeedWidget />
  },
  {
    _id: "7",
    name: "Latest News",
    component: <CryptoNewsTerminal />
  }
];

export default baralist;