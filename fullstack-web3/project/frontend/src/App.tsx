import React from 'react';
import logo from './logo.svg';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <>
      <div className="flex">
        <img src={logo} className="w-20" alt="logo" />
      </div>
      <QueryClientProvider client={queryClient}>
        <p className='m-8'>
          Coins Available RN
        </p>
      </QueryClientProvider>
    </>
  );
}

export default App;
