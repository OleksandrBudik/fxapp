import '../styles/SearchInput.scss'
const SearchInput = ({ label = 'Search', onChange, ...rest }) => {
  return (
    <div className={'search-input__wrapper'}>
      <div className="search-input__label">{label}</div>
      <input className="input-area" onChange={onChange} {...rest} />
    </div>
  )
}

export default SearchInput
