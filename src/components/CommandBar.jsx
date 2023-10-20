import '../styles/CommandBar.scss'
import PropTypes from 'prop-types'

const CommandBar = ({ children }) => {
  return <div className="command-bar">{children}</div>
}

CommandBar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default CommandBar
