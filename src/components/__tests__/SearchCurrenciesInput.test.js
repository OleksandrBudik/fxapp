import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import SearchCurrenciesInput from '../SearchCurrenciesInput'
import { GlobalContext } from '../../App'
describe('test search input', () => {
  test('test it renders correctly', async () => {
    const customRender = (ui, { providerOptions, ...renderOptions }) => {
      return render(
        <GlobalContext.Provider {...providerOptions}>
          {ui}
        </GlobalContext.Provider>,
        renderOptions
      )
    }
    const inputValue = 'm'
    const providerOptions = { value: [inputValue] }
    customRender(<SearchCurrenciesInput />, { providerOptions })
    await waitFor(() => {
      expect(screen.getByRole('searchbox')).toBeDefined()
    })
    await waitFor(() => {
      const input = screen.getByRole('searchbox')
      fireEvent.change(input, { target: { value: inputValue } })
      expect(input.value).toBe(inputValue)
    })
  })
})
