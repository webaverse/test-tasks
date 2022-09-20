import React from 'react';
import ListItem from './ListItem';

const List = (props) => {
  const currencies = props.currencies;
  return (
    <div className='w-96 bg-green-600 h-96 overflow-scroll'>
      {currencies.map(currency => (<ListItem currency={currency} />))}
    </div>
  )
}

export default List;