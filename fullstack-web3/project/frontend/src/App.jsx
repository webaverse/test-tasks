import axios from "axios";
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import Skeleton from "react-loading-skeleton";
import 'react-dropdown/style.css';
import 'react-loading-skeleton/dist/skeleton.css'
import List from './components/List';
import { CoinStats, baseURL } from './constants';

const App = () => {

  const options = [
    'USD', 'HKD', 'KRW', 'SGD'
  ];
  const defaultOption = options[0];

  const [currencies, setCurrencies] = useState([]);
  const [selectValue, setSelectValue] = useState(defaultOption);
  const [exchanges, setExchanges] = useState([]);

  let fetchedData = new Array();

  useEffect(() => {
    fetch(`${CoinStats}?currency=USD`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res;
      })
      .then((data) => {
        setCurrencies(data.coins);
      },
      ).catch((error) => {
        console.log(error);
      })
  }, []);

  useEffect(() => {
    fetch(`${CoinStats}?currency=${selectValue}`)
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res;
      })
      .then(
        async (data) => {
          fetchedData = [];
          console.log("current:", data.coins);
          for await (const currency of data.coins) {
            try {
              const response = await axios.get(`${baseURL}?coinId=${currency.id}&symbol=${currency.symbol}&currency=${selectValue}`);
              fetchedData.push(response.data);
            } catch (e) {
              console.log('axios error: ', e);
            }
          }
          setExchanges(fetchedData);
        },
      ).catch((error) => {
        console.log(error);
      })
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
        {
          exchanges.length >= 1 ?
            <List trade={exchanges} /> :
            <Skeleton width={384} height={384} />
        }
      </div>
    </div>
  )
}

export default App
