import { useState } from 'react';
import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrencyList } from './components/CurrencyList';
import { CurrencySelector } from './components/CurrencySelector';
const queryClient = new QueryClient()

function App() {
  const [currentFiat, setCurrentFiat] = useState('USD');
  const [currentOrder, setCurrentOrder] = useState('rank');

  return (
    <>
      <div className="flex">
        <img src={logo} className="w-20 m-4" alt="logo" />
      </div>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center mx-auto max-w-4xl	">
          <h2 className='text-cyan-600 font-bold mx-auto text-2xl'>Cryptocurrency Info</h2>
          <CurrencySelector currentFiat={currentFiat} setCurrentFiat={setCurrentFiat} />
          <div className='flex justify-center'>
            <button onClick={(e) => setCurrentOrder('rank')} className='m-4 py-2 px-4 bg-cyan-600 text-white rounded'>Sort by Rank</button>
            <button onClick={(e) => setCurrentOrder('name')} className='m-4 py-2 px-4 bg-cyan-600 text-white rounded'>Sort by Name</button>
          </div>
          <CurrencyList fiat={currentFiat} order={currentOrder} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
