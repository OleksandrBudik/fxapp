export const validateCurrency = (currencyItem) => {
  const { currency, precision, exchangeRate } = currencyItem
  if (
    Boolean(currency) &&
    (typeof currency === 'string' || currency instanceof String) &&
    Number.isInteger(precision) &&
    precision >= 0 &&
    exchangeRate?.middle &&
    Number.isFinite(exchangeRate.middle)
  ) {
    return true
  }
  return false
}

export const shouldShow = (currencyItem, searchTerm) => {
  if (!searchTerm) return true
  console.log(' curr item ', currencyItem, ' term ', searchTerm)
  return currencyItem?.currency
    .toLowerCase()
    .includes(searchTerm?.trim()?.toLowerCase())
}

export const deserialiseCurrencyResponse = (response, searchTerm = '') => {
  const { baseCurrency } = response
  if (
    Boolean(baseCurrency) &&
    (typeof baseCurrency === 'string' || baseCurrency instanceof String)
  ) {
    return {
      baseCurrency: baseCurrency,
      fxData: response.fx?.filter((currency) => {
        return validateCurrency(currency) && shouldShow(currency, searchTerm)
      }),
    }
  }
  return { data: [] }
}
