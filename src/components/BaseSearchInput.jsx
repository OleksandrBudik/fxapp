import PropTypes from 'prop-types'
import '../styles/BaseSearchInput.scss'

const BaseSearchInput = ({ label = 'Search', ...rest }) => {
  return (
    <div className={'search-input__wrapper'}>
      <div className="search-input__label">{label}</div>
      <input className="input-area" type={'search'} {...rest} />
    </div>
  )
}

BaseSearchInput.propTypes = {
  label: PropTypes.string,
}

export default BaseSearchInput
