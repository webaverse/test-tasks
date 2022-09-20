import React from 'react';
import CurrencyItem from './CurrencyItem';
import TradeItem from './TradeItem';

const List = (props) => {
  return (
    <div className='w-96 bg-green-600 h-96 overflow-scroll'>
      {props.currencies ?
        props.currencies.map(item => (<CurrencyItem currency={item} />)) :
        <></>
      }
      {props.trade ?
        props.trade.map(item => (<TradeItem trade={item} />)) :
        <></>
      }
    </div>
  )
}

export default List;