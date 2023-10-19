import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('test22', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  test('renders App container with Search Input inside', async () => {
    waitFor(() => {
      const app = render(<App />)
      expect(app.container).toBeDefined
    })
    const searchInput = screen.getByRole('searchbox')
    expect(searchInput).toBeTruthy()
  })
})
