import { UseCurrencyList } from "../hooks/UseCurrencyList";
import { Currency } from "./Currency";

export interface CurrencyListProps {
    fiat: string
    order: string
}

export const CurrencyList = (props: CurrencyListProps) => {
    const currencyResults = UseCurrencyList(props.fiat);
    if (currencyResults.status === 'loading') {
        return <div>Loading...</div>
    }
    if (currencyResults.status === 'error') {
        return <div>Error: {currencyResults.error}</div>
    }
    if (currencyResults.data === null) {
        return <div>Something Went Wrong</div>
    }
    const currencies = currencyResults.data.sort((a, b) => {
        if (props.order === 'name') {
            return ('' + a.name).localeCompare(b.name);
        } else {
            return a.rank - b.rank 
        }
    }).map((currInfo, index) => {
        return <Currency key={currInfo.id} currency={currInfo} />
    })

    return (
        <div className='mt-8 p-1 flex flex-col items-start'>
            {currencies}
        </div>
    )
}