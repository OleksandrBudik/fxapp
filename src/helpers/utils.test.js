import {
  validateCurrency,
  matchSearch,
  deserialiseCurrencyResponse,
  setUrlHash,
} from './utils'

describe('should validate currency correctly', () => {
  test('should return false for wrong currency field', () => {
    const withWrongCurrencyField = {
      currency: 123,
      precision: 2,
      exchangeRate: { middle: 12 },
    }
    expect(validateCurrency(withWrongCurrencyField)).toBeFalsy()
  })
  test('should return false if currency field is undefined', () => {
    const withoutCurrencyField = {
      precision: 2,
      exchangeRate: { middle: 12 },
    }
    expect(validateCurrency(withoutCurrencyField)).toBeFalsy()
  })
  test('should return false if precision field is wrong', () => {
    const withWrongPrecisionField = {
      currency: 'USD',
      precision: 'wrong',
      exchangeRate: { middle: 12 },
    }
    expect(validateCurrency(withWrongPrecisionField)).toBeFalsy()
  })
  test('should return false if precision field is undefined', () => {
    const withoutPrecisionField = {
      currency: 'USD',
      exchangeRate: { middle: 12 },
    }
    expect(validateCurrency(withoutPrecisionField)).toBeFalsy()
  })
  test('should return false if exchangeRate field is wrong', () => {
    const withWrongExchangeRate = {
      currency: 'USD',
      precision: 2,
      exchangeRate: { midl: 12 },
    }
    expect(validateCurrency(withWrongExchangeRate)).toBeFalsy()
  })
  test('should return false if exchangeRate is undefined', () => {
    const withoutExchangeRate = {
      currency: 'USD',
      precision: 2,
    }
    expect(validateCurrency(withoutExchangeRate)).toBeFalsy()
  })
  test('should return true if currency fields are all correct', () => {
    const correctPayload = {
      currency: 'USD',
      precision: 2,
      exchangeRate: { middle: 12 },
    }
    expect(validateCurrency(correctPayload)).toBeTruthy()
  })
})

describe('should check if search term matches currency', () => {
  const usdCurrency = {
    currency: 'USD',
  }
  test('should pass validation with uppercase search term', () => {
    const usSearchTermUC = 'US'
    expect(matchSearch(usdCurrency, usSearchTermUC)).toBeTruthy()
  })
  test('should pass validation with lowercase search term', () => {
    const usSearchTermLC = 'us'
    expect(matchSearch(usdCurrency, usSearchTermLC)).toBeTruthy()
  })
  test('should pass validation with mixed search term', () => {
    const usSearchTermMixed = 'uS'
    expect(matchSearch(usdCurrency, usSearchTermMixed)).toBeTruthy()
  })
  test('should not pass validation if not included', () => {
    const fjdSearchTerm = 'j'
    expect(matchSearch(usdCurrency, fjdSearchTerm)).toBeFalsy()
  })
  test('should check if search term matches currency', () => {
    const usSearchTermUC = 'US'
    expect(matchSearch(usdCurrency, usSearchTermUC)).toBeTruthy()
  })
})
describe('should deserialise currency response', () => {
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
  test('should set fxData if baseCurrency is valid', () => {
    expect(deserialiseCurrencyResponse(response).fxData).toHaveLength(1)
    expect(deserialiseCurrencyResponse(response).baseCurrency).toBe('EUR')
  })
  test('should set fxData to empty array if baseCurrency is not valid', () => {
    const invalidResponse = { ...response, baseCurrency: undefined }
    expect(deserialiseCurrencyResponse(invalidResponse).fxData).toHaveLength(0)
  })
})

describe('should set hash in url', () => {
  const search = 'testsearch'
  const expectedhasValueInUrl = `#${search}`
  setUrlHash(search)
  expect(window.location.hash).toBe(expectedhasValueInUrl)
})
