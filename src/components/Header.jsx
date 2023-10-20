import '../styles/Header.scss'
import PropTypes from 'prop-types'

const Header = ({ title = 'George FE Test' }) => {
  return (
    <div className="app-header">
      <div className="title">{title}</div>
    </div>
  )
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header
