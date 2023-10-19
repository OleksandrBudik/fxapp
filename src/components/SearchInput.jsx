import { useContext } from 'react'
import { GlobalContext } from '../App.js'
import '../styles/SearchInput.scss'

const SearchInput = ({ label = 'Search', ...rest }) => {
  const [searchTerm, setSearchTerm] = useContext(GlobalContext)
  if (window.history.replaceState) {
    const url =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname
    window.history.replaceState(
      {
        path: url,
      },
      '',
      `${searchTerm ? `#${searchTerm}` : ''}`
    )
  }
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className={'search-input__wrapper'}>
      <div className="search-input__label">{label}</div>
      <input
        className="input-area"
        value={searchTerm}
        onChange={handleChange}
        type={'search'}
        {...rest}
      />
    </div>
  )
}

export default SearchInput
