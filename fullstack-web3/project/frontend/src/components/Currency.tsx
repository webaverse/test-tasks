
import { CurrencyInfo } from "../hooks/UseCurrencyList"
import { BestExchange } from "./BestExchange"
import { useRef } from 'react';
import { UseOnScreen } from "../hooks/UseOnScreen";
import { useDebounce } from "use-debounce";

export interface CurrencyProps {
    currency: CurrencyInfo
    fiat: string
}

function numberWithCommas(x: number) : string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const Currency = (props: CurrencyProps) => {

    const ref = useRef<HTMLDivElement>(null)
    const isVisible = UseOnScreen(ref)
    const [debouncedIsVisible] = useDebounce(isVisible, 1000);
    const currency : CurrencyInfo = props.currency
    return(
        <div ref={ref} key={currency.id} className='p-2 flex items-start justify-items-start'>
            <div className='my-3 mx-3 md:mx-8 py-2'>
                <a target='_none' href={currency.websiteUrl} className='block w-24'>
                    <img src={currency.icon} alt={currency.name} className='mx-auto' />
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
                    <div className='md:mr-6 md:my-1'>Price: {currency.fiatSymbol}{currency.price}</div>
                    <div className='md:mr-6 md:my-1'>Volume: {currency.fiatSymbol}{numberWithCommas(currency.volume)}</div>
                    <div className='md:mr-6 md:my-1'>Market Cap: {currency.fiatSymbol}{numberWithCommas(currency.marketCap)}</div>
                    <BestExchange visible={debouncedIsVisible} currency={currency.id} fiat={props.fiat} />
                </div>
            </div>
        </div>
    )
}