import React, { useEffect, useState } from 'react';
import List from './components/List';

const mockups = [
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "A",
    "symbol": "BTC",
    "rank": 1,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "B",
    "symbol": "BTC",
    "rank": 2,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "CBitcoin",
    "symbol": "BTC",
    "rank": 4,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "DBitcoin",
    "symbol": "BTC",
    "rank": 3,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "1Bitcoin",
    "symbol": "BTC",
    "rank": 5,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },
  {
    "id": "bitcoin",
    "icon": "https://static.coinstats.app/coins/1650455588819.png",
    "name": "Bitcoin",
    "symbol": "BTC",
    "rank": 1,
    "price": 18840.18106022015,
    "priceBtc": 1,
    "volume": 35137475944.003006,
    "marketCap": 360876471259.352,
    "availableSupply": 19154618,
    "totalSupply": 21000000,
    "priceChange1h": -3.2,
    "priceChange1d": -5.86,
    "priceChange1w": -14.49,
    "websiteUrl": "http://www.bitcoin.org",
    "twitterUrl": "https://twitter.com/bitcoin",
    "exp": [
      "https://blockchair.com/bitcoin/",
      "https://btc.com/",
      "https://btc.tokenview.io/"
    ]
  },

]

const App = () => {

  const [currencies, setCurrnecies] = useState([]);

  useEffect(() => {
    setCurrnecies(mockups);
  });

  const handleOrderbyName = () => {
    console.log('Order by Name');
  }

  const handleOrderbyRanking = () => {
    console.log('Order by Ranking');
  }

  return (
    <div className="flex flex-col justy-center items-center mt-20">
      <div className="order flex justy-center items-center mb-10">
        <button className="mx-5 bg-blue-600 text-white px-5 py-2" onClick={handleOrderbyRanking}>By Ranking</button>
        <button className="mx-5 bg-blue-600 text-white px-5 py-2" onClick={handleOrderbyName}>By Name</button>
      </div>
      <div>
        <List currencies={currencies} />
      </div>
      <div></div>
    </div>
  )
}

export default App
