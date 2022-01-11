import HeadApp from '@Components/HeadApp'
import AppContext from '@Hooks/AppContext/AppContext'
import reducer, { State } from '@Redux/reducers/pages/reducer'
import type { AppProps } from 'next/app'
import { useEffect, useReducer } from 'react'

const todoLocal = () => {
  if (typeof window !== 'undefined') {
    const dataLocal = localStorage.getItem('todos')
    return JSON.parse(dataLocal || '[]')
  }
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [list, dispatch] = useReducer(reducer, todoLocal())

  useEffect(() => {
    list.length > 0 && localStorage.setItem('todos', JSON.stringify(list))
  }, [list])

  return (
    <AppContext.Provider value={{ list, dispatch }}>
      <HeadApp />
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}

export default MyApp
