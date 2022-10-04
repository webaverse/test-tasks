
export interface CurrencySelectorProps {
    currentFiat: string
    setCurrentFiat: (fiat: string) => void
}

export const CurrencySelector = (props: CurrencySelectorProps) => {

    const fiatOptions = ['USD', 'HKD', 'KRW', 'SGD'].map((fiatName) => {
        if (props.currentFiat === fiatName) {
            return <option key={fiatName} value={fiatName} selected>{fiatName}</option>
        } else {
            return <option key={fiatName} value={fiatName}>{fiatName}</option>
        }
    })

    return (
        <div className='my-4 mx-auto text-base'>
            <label className='mx-4'>Select Fiat Currency:</label>
            <select id='fiatSelect' className='p-2 w-24 mx-auto bg-slate-200 rounded-md' value={props.currentFiat} onChange={(e) => props.setCurrentFiat(e.target.value)}>
                {fiatOptions}
            </select>
        </div>

    )
}