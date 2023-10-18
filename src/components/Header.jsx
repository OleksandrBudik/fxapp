import '../styles/Header.scss'

const Header = ({ title = 'George FE Test' }) => {
  return (
    <div className="app-header">
      <div className="title">{title}</div>
    </div>
  )
}

export default Header
