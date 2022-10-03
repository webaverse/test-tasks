
import { CurrencyInfo } from "../hooks/UseCurrencyList"

export interface CurrencyProps {
    currency: CurrencyInfo
}

function numberWithCommas(x: number) : string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Currency = (props: CurrencyProps) => {

    const currency : CurrencyInfo = props.currency
    return(
        <div className='p-2 mx-auto'>
            <div className='m-2'><img src={currency.icon} alt={currency.name} /></div>
            <div className='m-2 font-bold'>
                <a target='_none' href={currency.websiteUrl}>
                    {currency.name} [{currency.symbol}]
                </a>
            </div>
            <div className='m-2'>Price: ${currency.price}</div>
            <div className='m-2'>Volume: ${numberWithCommas(currency.volume)}</div>
            <div className='m-2'>Market Cap: ${numberWithCommas(currency.marketCap)}</div>
        </div>
    )
}