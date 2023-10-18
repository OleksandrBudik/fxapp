import { useContext } from 'react'
import { GlobalContext } from '../App.js'
import '../styles/SearchInput.scss'

const SearchInput = ({ label = 'Search', ...rest }) => {
  const [, setSearchTerm] = useContext(GlobalContext)
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div className={'search-input__wrapper'}>
      <div className="search-input__label">{label}</div>
      <input className="input-area" onChange={handleChange} {...rest} />
    </div>
  )
}

export default SearchInput
