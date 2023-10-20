import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import CurrencyItem from '../CurrencyItem'
describe('test currency item', () => {
  test('currency item is rendering', () => {
    render(
      <CurrencyItem
        currency="US"
        countryName="USA"
        exchangeRate={123}
        baseCurrency="EUR"
        precision={3}
        flagCode="us"
      />
    )
    const listItem = screen.getByRole('listitem')
    expect(listItem).toBeDefined()
  })
  test('currency item is rendering', () => {
    render(
      <CurrencyItem
        currency="US"
        countryName="USA"
        exchangeRate={123}
        baseCurrency="EUR"
        flagCode="us"
      />
    )
    const listItem = screen.getByRole('listitem')
    expect(listItem).toBeDefined()
  })
})
