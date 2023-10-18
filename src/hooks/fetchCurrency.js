import { useEffect, useState } from 'react'
import { deserialiseCurrencyResponse } from '../helpers/utils'

const CURRENCY_URI = '/fx.json'

export default function useCurrencyData(searchTerm) {
  const [data, setData] = useState([])
  const [inProgress, setInProgress] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  console.log(' searchTerm ', searchTerm)
  const apiUrl = process.env.REACT_APP_CURRENCY_API
  useEffect(() => {
    setInProgress(true)
    fetch(`${apiUrl}${CURRENCY_URI}`)
      .finally(setInProgress(false))
      .then((res) => res.json())
      .then((data) => {
        setData(deserialiseCurrencyResponse(data, searchTerm))
        setIsLoaded(true)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [searchTerm])
  return { data, inProgress, isLoaded }
}
