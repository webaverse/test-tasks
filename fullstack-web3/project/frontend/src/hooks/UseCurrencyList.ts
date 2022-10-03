import { useQuery } from '@tanstack/react-query'

export interface CurrencyInfo {
    id: string;
    icon: string;
    name: string;
    symbol: string;
    price:  number;
    volume: number;
    marketCap: number;
    websiteUrl: string;
}

export interface CurrencyListResult {
    status: string;
    error: string | null;
    data: CurrencyInfo[] | null;
}

export const UseCurrencyList = () : CurrencyListResult => {
    const { isLoading, error, data } = useQuery(['currencyListData'], () =>
    fetch('https://api.coinstats.app/public/v1/coins?currency=USD').then(res =>
        res.json()
        )
    )
    if (isLoading) {
        return {
            status: 'loading',
            error: null,
            data: null
        }   
    }
    if (error) {
        return {
            status: 'error',
            // @ts-ignore
            error: error.message,
            data: null
        }
    }
    const currencyList = data.coins.map((coin: any) => {
        const info: CurrencyInfo = {
            id: coin.id,
            icon: coin.icon,
            name: coin.name,
            symbol: coin.symbol,
            price: Math.round(coin.price * 100) / 100,
            volume: Math.round(coin.volume),
            marketCap: Math.round(coin.marketCap),
            websiteUrl: coin.websiteUrl
        }
        return info
    })
    return (
        {
            status: 'success',
            error: null,
            data: currencyList
        }
    )
}