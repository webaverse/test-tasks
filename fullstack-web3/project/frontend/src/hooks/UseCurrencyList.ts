import { useQuery } from '@tanstack/react-query'

export interface CurrencyInfo {
    fiat: string;
    fiatSymbol: string;
    id: string;
    icon: string;
    name: string;
    symbol: string;
    rank: number;
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

interface symbolMapping {
    [key: string]: string;
}

export const fiatSymbols : symbolMapping  = {
    USD: '$',
    HKD: 'HK$',
    KRW: '₩',
    SGD: 'S$'
}

export const UseCurrencyList = (fiat: string) : CurrencyListResult => {
    const fetchKey = `currency-list-${fiat}`;
    const fetchUrl = `https://api.coinstats.app/public/v1/coins?currency=${fiat}`
    const { isLoading, error, data } = useQuery([fetchKey], () =>
    fetch(fetchUrl).then(res =>
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
            fiat: fiat,
            fiatSymbol: fiatSymbols[fiat],
            id: coin.id,
            icon: coin.icon,
            name: coin.name,
            symbol: coin.symbol,
            rank: coin.rank,
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