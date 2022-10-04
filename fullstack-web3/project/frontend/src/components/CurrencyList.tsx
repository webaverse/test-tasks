import { UseCurrencyList } from "../hooks/UseCurrencyList";
import { Currency } from "./Currency";

export const CurrencyList = () => {
    const currencyResults = UseCurrencyList();
    if (currencyResults.status === 'loading') {
        return <div>Loading...</div>
    }
    if (currencyResults.status === 'error') {
        return <div>Error: {currencyResults.error}</div>
    }
    if (currencyResults.data === null) {
        return <div>Something Went Wrong</div>
    }
    const currencies = currencyResults.data.map((currInfo, index) => {
        return <Currency key={currInfo.id} currency={currInfo} />
    })
    return (
        <div className='mt-8 p-1 flex flex-col items-start'>
            {currencies}
        </div>
    )
}