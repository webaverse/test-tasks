import { UseBestExchange } from "../hooks/UseBestExchange";

export interface BestExchangeProps {
    currency: string
    fiat: string
}


export const BestExchange = (props: BestExchangeProps) => {

    const bestExchange = UseBestExchange(props.currency, props.fiat)

    if (bestExchange.status === 'loading') {
        return <div>Best Exchange: Loading...</div>
    }
    if (bestExchange.status === 'error') {
        return <div>Best Exchange: Failed To Load</div>
    }
    if (bestExchange.name === null) {
        return <div>Best Exchange: Oops Something Went Wrong</div>
    }

    return (
        <div>
            Best Exchange: {bestExchange.name}
        </div>
    )

}