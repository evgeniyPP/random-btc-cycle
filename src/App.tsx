import { useEffect, useState } from 'react';

import Logo from './Logo';
import GithubButton from './GithubButton';
import DonateButton from './DonateButton';

import { cn } from './utils/classnames';
import { getRandomUnixTimestamp } from './utils/getRandomUnixTimestamp';
import { formatUnixTimestamp } from './utils/formatUnixTimestamp';
import { setTimestampToMidnight } from './utils/setTimestampToMidnight';

const startTimestamp = 1502928000; // 2017-08-17'
const currentTimestamp = new Date().getTime() / 1000;
const yearInSeconds = 24 * 60 * 60 * 365;
const endTimeStamp = currentTimestamp - 4 * yearInSeconds;

const startDate = setTimestampToMidnight(getRandomUnixTimestamp(startTimestamp, endTimeStamp));
const endDate = startDate + 4 * yearInSeconds;

function App() {
  const [startPrice, setStartPrice] = useState('');
  const [endPrice, setEndPrice] = useState('');

  useEffect(() => {
    fetch(
      'https://www.binance.com/api/v3/klines?' +
        new URLSearchParams({
          symbol: 'BTCUSDT',
          interval: '1d',
          startTime: startDate * 1000 + '',
          endTime: startDate * 1000 + '',
        })
    )
      .then(res => res.json())
      .then(data => {
        const value = +data[0][4] as number;
        setStartPrice(value.toFixed(2));
      });
    fetch(
      'https://www.binance.com/api/v3/klines?' +
        new URLSearchParams({
          symbol: 'BTCUSDT',
          interval: '1d',
          startTime: endDate * 1000 + '',
          endTime: endDate * 1000 + '',
        })
    )
      .then(res => res.json())
      .then(data => {
        const value = +data[0][4] as number;
        setEndPrice(value.toFixed(2));
      });
  }, []);

  return (
    <div className="bg-white py-24 sm:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#f7931a] sm:text-4xl">
            <Logo /> Random Bitcoin Cycle
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Do you know what would happen to your money <br /> if you bought Bitcoin some time ago
            and held it for 4 years? Let's find out!
          </p>
        </div>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">
                  dated {formatUnixTimestamp(startDate)}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {startPrice ? `$${startPrice}` : '...'}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">
                  dated {formatUnixTimestamp(endDate)}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  {endPrice ? `$${endPrice}` : '...'}
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">Growth</dt>
                <dd
                  className={cn(
                    'order-first text-3xl font-semibold tracking-tight sm:text-5xl',
                    startPrice && endPrice && +endPrice >= +startPrice
                      ? 'text-green-600'
                      : 'text-gray-900'
                  )}
                >
                  {startPrice && endPrice
                    ? +endPrice >= +startPrice
                      ? `+${Math.round((+endPrice / +startPrice) * 100)}%`
                      : `${Math.round((+startPrice / +endPrice) * 100 - 100)}%`
                    : '...'}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 flex gap-4">
        <GithubButton />
        <DonateButton />
      </div>
    </div>
  );
}

export default App;
