import React, { useState, useEffect } from 'react'
import './App.scss'
import Header from './components/Header'
import CommandBar from './components/CommandBar'
import SearchCurrenciesInput from './components/SearchCurrenciesInput'
import CurrencyList from './components/CurrencyList'

export const GlobalContext = React.createContext()

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    const hashValue = window.location.hash.substring(1)
    if (hashValue) {
      setSearchTerm(hashValue)
    }
  }, [])
  return (
    <GlobalContext.Provider value={[searchTerm, setSearchTerm]}>
      <div className="app">
        <Header />
        <CommandBar>
          <SearchCurrenciesInput />
        </CommandBar>
        <CurrencyList />
      </div>
    </GlobalContext.Provider>
  )
}

export default App
