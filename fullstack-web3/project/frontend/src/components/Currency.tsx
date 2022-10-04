
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
        <div className='p-2 flex items-start justify-items-start'>
            <div className='my-3 mx-3 md:mx-8 py-2'>
                <a target='_none' href={currency.websiteUrl} className='block w-24'>
                    <img src={currency.icon} alt={currency.name} />
                </a>
            </div>
            <div className='m-2'>
                <div className='my-2 md:my-1 font-bold text-2xl md:text-lg'>
                    <a target='_none' href={currency.websiteUrl}>
                        {currency.name} [{currency.symbol}]
                    </a>
                </div>
                <div className='flex flex-col lg:flex-row flex-wrap'>
                    <div className='md:mr-6 md:my-1'>Rank: #{currency.rank}</div>
                    <div className='md:mr-6 md:my-1'>Price: ${currency.price}</div>
                    <div className='md:mr-6 md:my-1'>Volume: ${numberWithCommas(currency.volume)}</div>
                    <div className='md:mr-6 md:my-1'>Market Cap: ${numberWithCommas(currency.marketCap)}</div>
                </div>
            </div>
        </div>
    )
}