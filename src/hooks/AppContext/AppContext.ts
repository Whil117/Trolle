import { Action, State } from '@Redux/reducers/pages/reducer'
import { createContext, Dispatch } from 'react'

type AppContext = {
  list: State[]
  dispatch: Dispatch<Action>
}

const AppContext = createContext({} as AppContext)

export default AppContext
