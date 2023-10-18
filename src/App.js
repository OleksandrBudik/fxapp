import React, { useState } from 'react'
import './App.scss'
import Header from './components/Header'
import CommandBar from './components/CommandBar'
import SearchInput from './components/SearchInput'
import CurrencyList from './components/CurrencyList'

export const GlobalContext = React.createContext()

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <GlobalContext.Provider value={[searchTerm, setSearchTerm]}>
      <div className="app">
        <Header />
        <CommandBar>
          <SearchInput />
        </CommandBar>
        <CurrencyList />
      </div>
    </GlobalContext.Provider>
  )
}

export default App
