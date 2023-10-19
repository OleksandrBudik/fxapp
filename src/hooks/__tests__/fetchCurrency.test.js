import { renderHook, waitFor } from '@testing-library/react'
import useCurrencyData from '../fetchCurrency'

export const fakeCurrenciesJSON = {
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
      precision: 2,
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
    {
      currency: 'STD',
      precision: 2,
    },
  ],
}

export const fakeCurrencies = {
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
      precision: 2,
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
    {
      currency: 'STD',
      precision: 2,
    },
    {
      currency: 'LVL',
      precision: 2,
      denominations: [500, 100, 50, 20, 10, 5],
      exchangeRate: {
        buy: 0.6821,
        middle: 0.6996,
        sell: 0.7171,
        indicator: 0,
        lastModified: '2013-12-30T23:00:00Z',
      },
      banknoteRate: {
        buy: 0.685304,
        middle: 0.702804,
        sell: 0.720304,
        indicator: 0,
        lastModified: '2013-12-30T23:00:00Z',
      },
      flags: ['provided'],
    },
    {
      currency: 'SCR',
      precision: 2,
      nameI18N: 'Seychelles-Rupee',
      exchangeRate: {
        buy: 14.7246,
        middle: 15.4746,
        sell: 16.2246,
        indicator: 0,
        lastModified: '2018-11-08T23:00:00Z',
      },
      banknoteRate: {
        buy: 14.167,
        middle: 15.667,
        sell: 17.167,
        indicator: 0,
        lastModified: '2018-11-06T23:00:00Z',
      },
      flags: ['provided'],
    },
  ],
}

describe('fetch currencies', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  afterEach(() => {
    fetchMock.resetMocks()
  })

  //   fetchMock.mockResolvedValue({
  //     status: 200,
  //     json: jest.fn(() => JSON.stringify(fakeCurrencies)),
  //   })

  test('hook should return api data', async () => {
    const { result } = renderHook(() => useCurrencyData(''))
    waitFor(() => {
      expect(result.current.data.fxData).toBeDefined
    })
    expect(result.current).toHaveProperty('data')
    expect(result.current).toHaveProperty('inProgress')
    expect(result.current).toHaveProperty('isLoaded')
  })
})
