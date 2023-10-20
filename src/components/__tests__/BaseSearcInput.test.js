import { render, screen, waitFor, act, fireEvent } from '@testing-library/react'
import BaseSearchInput from '../BaseSearchInput'
describe('test base search input', () => {
  test('test', () => {
    const onChange = jest.fn()
    render(<BaseSearchInput onChange={onChange} />)
    const input = screen.getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'us' } })
    expect(onChange).toHaveBeenCalled()
  })
})
