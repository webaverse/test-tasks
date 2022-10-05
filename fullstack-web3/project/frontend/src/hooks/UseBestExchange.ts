import { useQuery } from '@tanstack/react-query'
import { useState } from 'react';

export interface BestExchangeResult {
    status: string;
    error: string | null;
    name: string  | null;
}

export const UseBestExchange = (visible: boolean, currency: string, fiat: string) : BestExchangeResult => {
    const [viewed, setViewed] = useState(false)
    if (visible && !viewed) {
        setViewed(true)
    }
    const shouldLoad = visible || viewed
    const shouldLoadString = shouldLoad ? 'true' : 'false'
    const fetchKey = `best-exchange-${currency}-${fiat}-${shouldLoadString}`
    const fetchUrl = `http://localhost:4000/cheapest-exchange/${currency}/${fiat}`
    const { isLoading, error, data } = useQuery([fetchKey], () => {
        if (shouldLoad) {
            return fetch(fetchUrl).then(res => res.json())
        } else {
            return {status: 'not-loaded'}
        }
    })
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
    if (data.status === 'not-loaded') {
        return {
            status: 'loading',
            error: null,
            name: null
        } 
    }
    if (data.status !== 'success') {
        return {
            status: 'error',
            // @ts-ignore
            error: data.error,
            name: null
        }
    }
    const name = data.data ? data.data.exchange : 'None found :(';
    return {
        status: 'success',
        error: null,
        name: name
    }
}
