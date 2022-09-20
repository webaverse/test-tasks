import React from 'react';

const ListItem = (props) => {
  const currency = props.currency;
  return (
    <div className='bg-yellow-400 w-full h-20 flex px-10 py-5'>
      <div className="currency-rank flex justify-center items-center px-5"><code>{currency.rank}</code></div>
      <div className="currency-img h-full w-auto rounded">
        <img src={currency.icon} alt="image url" className="h-full w-auto" />
      </div>
      <div className="currency-data flex-grow flex flex-col items-center justify-between">
        <p className="text-center text-2xl">{`${currency.name}(${currency.symbol})`}</p>
      </div>
    </div>
  )
}

export default ListItem;