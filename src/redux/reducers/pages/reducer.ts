export const initState = []

type ListItem = {
  id?: string
  id_item: string
  title_item: string
  description_item?: string
  image_item?: string
  completed?: boolean
}

export type State = {
  id: string
  title_list: string
  list?: Array<ListItem>
}

const TypesReducers = {
  ADD_LIST: (state: State[], payload: State) => {
    return [...state, payload]
  },
  ADD_ITEM_LIST: (state: State[], payload: ListItem) => {
    return state.map((list) => {
      if (list.id === payload.id) {
        return {
          ...list,
          list: list.list
            ? [
                ...list.list,
                {
                  id_item: payload.id_item,
                  title_item: payload.title_item,
                },
              ]
            : [
                {
                  id_item: payload.id_item,
                  title_item: payload.title_item,
                },
              ],
        }
      }
      return list
    })
  },
}
export type Action = {
  type: keyof typeof TypesReducers
  payload: State | any
}
export const reducer = (state: State[], action: Action) => {
  const { type, payload } = action
  const handler = TypesReducers[type]
  const newState = handler ? handler(state, payload) : state
  return newState
}
export default reducer
