import { renderHook, waitFor } from '@testing-library/react'
import useCurrencyData from '../fetchCurrency'
import { deserialiseCurrencyResponse } from '../../helpers/utils'

export const mockedData = {
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

describe('useCurrencyData with successful fetch', () => {
  beforeEach(() => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedData),
    })
  })

  test('should return initial data and then fulfilled data', async () => {
    const { result } = renderHook(() => useCurrencyData('mx'))
    const { data, inProgress, isLoaded } = result.current
    expect(data.length).toEqual(0)
    expect(inProgress).toBeFalsy
    expect(isLoaded).toBeFalsy
    await waitFor(() => {
      expect(result.current).toEqual({
        data: deserialiseCurrencyResponse(mockedData, 'mx'),
        isLoaded: true,
        inProgress: false,
      })
    })
  })
})
