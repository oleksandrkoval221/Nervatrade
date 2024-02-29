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
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-4">
          <img src={image} width={30} alt="crypto" />
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-sm uppercase">{symbol}</h1>
            <h1 className="font-medium text-xs text-[#626D7C]">{name}</h1>
          </div>
        </div>
        <div className="text-right flex flex-col gap-2">
          <div className="font-medium text-sm">${price.toLocaleString()}</div>
          <div className="font-medium text-xs">
            {priceChange < 0 ? (
              <p className="red">{priceChange.toFixed(2)}%</p>
            ) : (
              <p className="text-[#00823E]">{priceChange.toFixed(2)}%</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
