import { useState } from 'react';
import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CurrencyList } from './components/CurrencyList';
import { CurrencySelector } from './components/CurrencySelector';
const queryClient = new QueryClient()

function App() {
  const [currentFiat, setCurrentFiat] = useState('USD');

  return (
    <>
      <div className="flex">
        <img src={logo} className="w-20 m-4" alt="logo" />
      </div>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-center mx-auto max-w-4xl	">
          <h2 className='text-cyan-600 font-bold mx-auto text-xl'>List of Cryptocurrencies</h2>
          <CurrencySelector currentFiat={currentFiat} setCurrentFiat={setCurrentFiat} />
          <CurrencyList fiat={currentFiat} />
        </div>
      </QueryClientProvider>
    </>
  );
}

export default App;
