import { useQuery } from '@tanstack/react-query'

export interface BestExchangeResult {
    status: string;
    error: string | null;
    name: string  | null;
}

export const UseBestExchange = (currency: string, fiat: string) : BestExchangeResult => {
    const fetchKey = `best-exchange-${fiat}-${currency}`;
    const fetchUrl = `http://localhost:4000/cheapest-exchange/${currency}/${fiat}`
    const { isLoading, error, data } = useQuery([fetchKey], () =>
    fetch(fetchUrl).then(res =>
        res.json()
        )
    )
    if (isLoading) {
        return {
            status: 'loading',
            error: null,
            name: null
        }   
    }
    if (error) {
        return {
            status: 'error',
            // @ts-ignore
            error: error.message,
            name: null
        }
    }

    return {
        status: 'success',
        error: null,
        name: data.exchange
    }
}
