import { render, screen, waitFor, act } from '@testing-library/react'
import { mockedData } from './hooks/__tests__/fetchCurrency.test'
import App from './App'
import * as useCurrencyData from './hooks/fetchCurrency'
import { deserialiseCurrencyResponse } from './helpers/utils'

describe('render App', () => {
  beforeEach(() => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockedData),
    })
  })
  test('renders App container with Search Input inside', async () => {
    const mockHook = jest.spyOn(useCurrencyData, 'default')
    mockHook.mockImplementation(() => ({
      data: deserialiseCurrencyResponse(mockedData),
      inProgress: false,
      isLoaded: true,
    }))
    waitFor(() => {
      const app = render(<App />)
      expect(app.container).toBeDefined
    })
  })
})
