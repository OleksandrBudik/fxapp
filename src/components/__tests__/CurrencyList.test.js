import { render, screen, waitFor, act } from '@testing-library/react'
import CurrencyList from '../CurrencyList'
import { GlobalContext } from '../../App'
import { mockedData } from '../../hooks/__tests__/fetchCurrency.test'
import { deserialiseCurrencyResponse } from '../../helpers/utils'
import * as useCurrencyData from '../../hooks/fetchCurrency'

describe('should render CurrencyList correctly', () => {
  test('currency list is rendered with data inside', async () => {
    const mockHook = jest.spyOn(useCurrencyData, 'default')
    const deserialisedData = deserialiseCurrencyResponse(mockedData)
    mockHook.mockImplementation(() => ({
      data: deserialisedData,
      inProgress: false,
      isLoaded: true,
    }))
    const customRender = (ui, { providerProps, ...renderOptions }) => {
      return render(
        <GlobalContext.Provider {...providerProps}>
          {ui}
        </GlobalContext.Provider>,
        renderOptions
      )
    }
    const providerProps = { value: ['mx'] }
    const { container } = customRender(<CurrencyList />, { providerProps })

    await waitFor(() => {
      expect(container).toBeDefined()
      const list = screen.getByRole('list')
      expect(list).toBeTruthy()
      const items = screen.getAllByRole('listitem')
      expect(items.length).toBe(deserialisedData.fxData.length)
    })
  })
})
