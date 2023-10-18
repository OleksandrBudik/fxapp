import './App.scss'
import Header from './components/Header'
import CommandBar from './components/CommandBar'
import SearchInput from './components/SearchInput'

function App() {
  return (
    <div className="app">
      <Header />
      <CommandBar>
        <SearchInput />
      </CommandBar>
    </div>
  )
}

export default App
