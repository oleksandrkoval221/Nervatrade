import "./Coin.css";

interface propsType {
  image: string;
  name: string;
  price: string;
  volume: string;
  symbol: string;
  priceChange: number;
  marketcap: string;
}
const Coin = ({
  image,
  name,
  price,
  volume,
  symbol,
  priceChange,
  marketcap,
}: propsType) => {
  return (
    <div className="text-sm py-2 border-b border-[#343B45]">
      <div className="flex fle-col items-center gap-3">
        <img src={image} width={30} className="flex-shrink-0" alt="crypto" />
        <div className="w-full grid gap-1">
          <div className="flex items-center justify-between font-medium text-sm">
            <h1 className="uppercase">{symbol}</h1>
            <div>${price.toLocaleString()}</div>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-[#626D7C]">{name}</h1>
            <div>
              {priceChange < 0 ? (
                <p className="red">{priceChange.toFixed(2)}%</p>
              ) : (
                <p className="text-[#00823E]">{priceChange.toFixed(2)}%</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
