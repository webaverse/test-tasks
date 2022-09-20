import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

const ListItem = (props) => {
  const trade = props.trade;
  return (
    <div className='bg-yellow-400 w-full h-20 grid grid-row-1 grid-cols-12 py-10'>
      <div className="trade-currency col-span-4 flex items-center justify-center">
        <p className="text-center text-2xl">{`${trade.currency}`}</p>
      </div>
      <div className='flex items-center col-span-1 justify-center'><FontAwesomeIcon icon={faAngleDoubleRight} /></div>
      <div className="trade-currency col-span-7 flex flex-col items-center justify-center">
        <p className="text-center text-2xl">{`${trade.exchange}`}</p>
      </div>
    </div>
  )
}

export default ListItem;