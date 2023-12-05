import './Coin.css';

interface propsType {
  image: string;
  name: string;
  price: string;
  volume: string;
  symbol: string;
  priceChange: number;
  marketcap: string;
}
const Coin = ({ image, name, price, volume, symbol, priceChange, marketcap }: propsType) => {
  return (
    <div className="text-sm py-2 border-b border-gray-500/20">
      <div className='flex flex-wrap justify-between items-center gap-3'>
        <div className='flex items-center gap-1'>
          <img src={image} width={24} alt="crypto" />
          <h1>{name}</h1>
        </div>
        <div className='text-right'>
          <div>${price.toLocaleString()}</div>
          <div className='text-xs'>
            {priceChange < 0 ? (
              <p className="red">{priceChange.toFixed(2)}%</p>
            ) : (
              <p className="green">{priceChange.toFixed(2)}%</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Coin;