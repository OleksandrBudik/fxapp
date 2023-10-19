import {
  validateCurrency,
  matchSearch,
  deserialiseCurrencyResponse,
} from './utils'

test('should validate currency correctly', () => {
  const withWrongCurrencyField = {
    currency: 123,
    precision: 2,
    exchangeRate: { middle: 12 },
  }
  const withoutCurrencyField = {
    precision: 2,
    exchangeRate: { middle: 12 },
  }
  const withWrongPrecisionField = {
    currency: 'USD',
    precision: 'wrong',
    exchangeRate: { middle: 12 },
  }
  const withoutPrecisionField = {
    currency: 'USD',
    exchangeRate: { middle: 12 },
  }
  const withWrongExchangeRate = {
    currency: 'USD',
    precision: 2,
    exchangeRate: { midl: 12 },
  }
  const withoutExchangeRate = {
    currency: 'USD',
    precision: 2,
  }
  const correctPayload = {
    currency: 'USD',
    precision: 2,
    exchangeRate: { middle: 12 },
  }
  expect(validateCurrency(withWrongCurrencyField)).toBeFalsy()
  expect(validateCurrency(withoutCurrencyField)).toBeFalsy()
  expect(validateCurrency(withWrongPrecisionField)).toBeFalsy()
  expect(validateCurrency(withoutPrecisionField)).toBeFalsy()
  expect(validateCurrency(withWrongExchangeRate)).toBeFalsy()
  expect(validateCurrency(withoutExchangeRate)).toBeFalsy()
  expect(validateCurrency(correctPayload)).toBeTruthy()
})

test('should check if search term matches currency', () => {
  const usSearchTermUC = 'US'
  const usSearchTermLC = 'us'
  const usSearchTermMixed = 'uS'
  const fjdSearchTerm = 'j'
  const usdCurrency = {
    currency: 'USD',
    precision: 2,
    exchangeRate: { middle: 2.5 },
  }
  const fjdCurrency = {
    currency: 'FJD',
    precision: 2,
    exchangeRate: { middle: 2.5 },
  }
  expect(matchSearch(usdCurrency, usSearchTermUC)).toBeTruthy()
  expect(matchSearch(usdCurrency, usSearchTermLC)).toBeTruthy()
  expect(matchSearch(usdCurrency, usSearchTermMixed)).toBeTruthy()
  expect(matchSearch(usdCurrency, fjdSearchTerm)).toBeFalsy()
  expect(matchSearch(fjdCurrency, fjdSearchTerm)).toBeTruthy()
  expect(matchSearch(fjdCurrency, usSearchTermUC)).toBeFalsy()
})

test('should deserialise currency response', () => {
  const response = {
    institute: 198,
    lastUpdated: '2018-11-09T15:07:00Z',
    comparisonDate: '2018-11-09T12:45:00Z',
    baseCurrency: 'EUR',
    fx: [
      {
        currency: 'FJD',
        precision: 2,
        nameI18N: 'Fiji Dollar',
        exchangeRate: {
          buy: 2.0,
          middle: 2.25,
          sell: 2.5,
          indicator: 0,
          lastModified: '2012-02-14T23:00:00Z',
        },
        banknoteRate: {
          buy: 2.2,
          middle: 2.4,
          sell: 2.6,
          indicator: 0,
          lastModified: '2018-11-06T23:00:00Z',
        },
        flags: ['provided'],
      },
      {
        currency: 'MXN',
        precision: 'wrong value',
        nameI18N: 'Mexican Peso',
        exchangeRate: {
          buy: 22.38,
          middle: 22.98,
          sell: 23.58,
          indicator: 0,
          lastModified: '2018-11-08T23:00:00Z',
        },
        banknoteRate: {
          buy: 21.1,
          middle: 22.6,
          sell: 24.1,
          indicator: 0,
          lastModified: '2018-11-06T23:00:00Z',
        },
        flags: ['provided'],
      },
    ],
  }

  const invalidResponse = { ...response, baseCurrency: undefined }

  expect(deserialiseCurrencyResponse(response).fxData).toHaveLength(1)
  expect(deserialiseCurrencyResponse(response).baseCurrency).toBe('EUR')
  expect(deserialiseCurrencyResponse(invalidResponse).fxData).toHaveLength(0)
})
