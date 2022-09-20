import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import List from './components/List';
import { CoinStats } from './constants';

const mockups_trade = [
  { currency: 'BTC', exchange: 'Pancakeswap' },
  { currency: 'ETH', exchange: 'Uniswap' },
  { currency: 'AVX', exchange: 'Biswap' },
  { currency: 'BNB', exchange: 'Pancakeswap' },
  { currency: 'SOL', exchange: 'Solswap' },
];

const App = () => {

  const options = [
    'USD', 'HKD', 'KRW', 'SGD'
  ];
  const defaultOption = options[0];

  const [currencies, setCurrencies] = useState([]);
  const [selectValue, setSelectValue] = useState(defaultOption);
  const [trade, setTrade] = useState([]);

  useEffect(() => {
    fetch(`${CoinStats}?currency=${selectValue}`)
      .then(res => res.json())
      .then(
        (result) => {
          setCurrencies(result.coins);
        },
        (error) => {
          console.log('error: ', error);
        }
      )
  }, [selectValue]);

  useEffect(() => {
    setTrade(mockups_trade);
  }, [selectValue]);

  const handleOrderbyName = () => {
    currencies.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      return 0;
    });

    setCurrencies([...currencies]);
  }

  const handleOrderbyRanking = () => {
    currencies.sort((a, b) => a.rank - b.rank);
    setCurrencies([...currencies]);
  }

  return (
    <div className="flex flex-col justy-center items-center mt-20">
      <div className="order-button flex justy-center items-center mb-10">
        <button className="mx-5 bg-blue-600 text-white px-5 py-2" onClick={handleOrderbyRanking}>By Ranking</button>
        <button className="mx-5 bg-blue-600 text-white px-5 py-2" onClick={handleOrderbyName}>By Name</button>
      </div>
      <div>
        <List currencies={currencies} />
      </div>
      <div className="dropdown w-96 flex justify-start items-center mt-10">
        <p className="mr-10">Select currency: </p>
        <div className="dropdownMenu w-40">
          <Dropdown
            options={options}
            onChange={(e) => {
              setSelectValue(e.value);
            }}
            value={selectValue}
          />
        </div>
      </div>
      <div className='mt-10'>
        <List trade={trade} />
      </div>
    </div>
  )
}

export default App
