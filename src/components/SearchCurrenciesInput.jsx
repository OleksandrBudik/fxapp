import { useContext } from 'react'
import BaseSearchInput from './BaseSearchInput'
import { GlobalContext } from '../App'
import { setUrlHash } from '../helpers/utils'

const SearchCurrenciesInput = () => {
  const [searchTerm, setSearchTerm] = useContext(GlobalContext)
  const handleChange = (e) => {
    setSearchTerm(e.target.value)
    setUrlHash(e.target.value)
  }
  return <BaseSearchInput onChange={handleChange} value={searchTerm} />
}

export default SearchCurrenciesInput
