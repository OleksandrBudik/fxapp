import '../styles/CurrencyItem.scss'
import PropTypes from 'prop-types'

const CurrencyItem = ({
  currency,
  countryName,
  exchangeRate,
  baseCurrency,
  precision = 2,
  flagCode,
}) => {
  return (
    <li className="currency-item">
      <div className="flag">
        <img src={`/flags/${flagCode}.png`}></img>
      </div>
      <div className="country">{countryName}</div>
      <div className="currency">{currency}</div>
      <div className="rate">
        {exchangeRate.toFixed(precision)} {baseCurrency}
      </div>
    </li>
  )
}

CurrencyItem.propTypes = {
  currency: PropTypes.string,
  countryName: PropTypes.string,
  exchangeRate: PropTypes.number,
  baseCurrency: PropTypes.string,
  precision: PropTypes.number,
  flagCode: PropTypes.string,
}

export default CurrencyItem
