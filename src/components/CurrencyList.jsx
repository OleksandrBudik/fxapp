import useCurrencyData from '../hooks/fetchCurrency'
import '../styles/CurrencyList.scss'
import CurrencyItem from './CurrencyItem'
import { currencies } from '../allCurrencies'
import { useContext, useEffect } from 'react'
import { GlobalContext } from '../App.js'

const CurrencyList = () => {
  const [searchTerm, setSearchTerm] = useContext(GlobalContext)
  const { data, inProgress, isLoaded } = useCurrencyData(searchTerm)
  //   const [filteredData, setFilteredData] = useState(data)
  console.log(' data! ', data)

  useEffect(() => {
    const hashValue = window.location.hash.substring(1)
    if (hashValue) {
      setSearchTerm(hashValue)
    }
  }, [])

  return (
    <ul className="currency-list">
      {isLoaded &&
        !inProgress &&
        data.fxData?.map((currencyItem) => (
          <CurrencyItem
            key={currencyItem.currency}
            currency={currencyItem.currency}
            flagCode={currencies[
              currencyItem.currency
            ]?.isoAlpha2?.toLowerCase()}
            countryName={currencies[currencyItem.currency]?.name}
            exchangeRate={currencyItem.exchangeRate.middle}
            baseCurrency={data.baseCurrency}
            precision={2}
          />
        ))}
    </ul>
  )
}

export default CurrencyList
