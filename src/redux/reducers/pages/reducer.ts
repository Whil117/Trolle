export const initState = []

export type checkList = {
  id: string
  title: string
  title_list?: string
  checked: boolean
}

export type Checklists = {
  id?: string
  id_list?: string
  id_list_item?: string
  id_checklist?: string
  id_checklist_item?: string
  title_list?: string
  title_checklist_item?: string
  title_checklist: string
  checklist?: Array<checkList>
}

export type ListItem = {
  id?: string
  id_item: string
  title_item: string
  description_item?: string
  image_item?: string
  checklists?: Array<Checklists>
}

export type State = {
  id: string
  title_list: string
  list?: Array<ListItem>
}
const reorder = (list: State[], startIndex: number, endIndex: number) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
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
  ADD_DESCRIPTION_ITEM: (state: State[], payload: ListItem) => {
    return state.map((list) => {
      if (list.id === payload.id) {
        return {
          ...list,
          list: list.list
            ? list.list.map((item) => {
                if (item.id_item === payload.id_item) {
                  return {
                    ...item,
                    description_item: payload.description_item,
                  }
                }
                return item
              })
            : [],
        }
      }
      return list
    })
  },
  ADD_IMAGE_ITEM: (state: State[], payload: ListItem) => {
    return state.map((list) => {
      if (list.id === payload.id) {
        return {
          ...list,
          list:
            list.list &&
            list.list.map((item) => {
              if (item.id_item === payload.id_item) {
                return {
                  ...item,
                  image_item: payload.image_item,
                }
              }
              return item
            }),
        }
      }
      return list
    })
  },
  UPLOAD_TITLE_ITEM: (state: State[], payload: ListItem) => {
    return state.map((item) => {
      if (item.id === payload.id) {
        return {
          ...item,
          list:
            item.list &&
            item.list.map((item) => {
              if (item.id_item === payload.id_item) {
                return {
                  ...item,
                  title_item: payload.title_item,
                }
              }

              return item
            }),
        }
      }
      return item
    })
  },
  ADD_CHECKLIST: (state: State[], payload: Checklists) => {
    return state.map((list) => {
      if (list.id === payload.id_list) {
        return {
          ...list,
          list:
            list.list &&
            list.list.map((item) => {
              if (item.id_item === payload.id_list_item) {
                return {
                  ...item,
                  checklists: item.checklists
                    ? [
                        ...item.checklists,
                        {
                          id_checklist: payload.id_checklist,
                          title_checklist: payload.title_checklist,
                        },
                      ]
                    : [
                        {
                          id_checklist: payload.id_checklist,
                          title_checklist: payload.title_checklist,
                        },
                      ],
                }
              }
              return item
            }),
        }
      }
      return list
    })
  },
  ADD_CHECKLIST_ITEM: (state: State[], payload: Checklists) => {
    return state.map((list) =>
      list.id === payload.id_list
        ? {
            ...list,
            list: list.list
              ? list.list.map((listItem) =>
                  listItem.id_item === payload.id_list_item
                    ? {
                        ...listItem,
                        checklists: listItem.checklists
                          ? listItem.checklists?.map((checklist) =>
                              checklist.id_checklist === payload.id_checklist
                                ? {
                                    ...checklist,
                                    checklist: checklist.checklist
                                      ? [
                                          ...checklist.checklist,
                                          {
                                            id: payload.id_checklist_item,
                                            title: payload.title_checklist_item,
                                          },
                                        ]
                                      : [
                                          {
                                            id: payload.id_checklist_item,
                                            title: payload.title_checklist_item,
                                          },
                                        ],
                                  }
                                : checklist
                            )
                          : [],
                      }
                    : listItem
                )
              : [],
          }
        : list
    )
  },
  REORDER: (
    state: State[],
    payload: {
      source: {
        index: number
        droppableId: string
      }
      destination: {
        index: number
        droppableId: string
      }
    }
  ) => {
    return reorder(state, payload.source.index, payload.destination.index)
  },
}
export type Action = {
  type: keyof typeof TypesReducers
  payload: any
}
export const reducer = (state: State[] | any, action: Action) => {
  const { type, payload } = action
  const handler = TypesReducers[type]
  const newState = handler ? handler(state, payload) : state
  return newState
}
export default reducer
