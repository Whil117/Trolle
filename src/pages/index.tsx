import AddNewItem from '@Components/AddNewItem/AddNewItem'
import ButtonComponent from '@Components/Button'
import Column from '@Components/Column'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { WrapperStyle } from '@Styles/atoms/styles'
import randomId from '@Utils/random_id/random_id'
import type { NextPage } from 'next'
import { useContext, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Index: NextPage = () => {
  const [show, setShow] = useState(false)
  const { list, dispatch } = useContext(AppContext)
  return (
    <main>
      <h1>Trolle App</h1>
      <DragDropContext
        onDragEnd={(res) => {
          const { source, destination } = res
          if (!destination) return
          if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
          )
            return
          dispatch({
            type: 'REORDER',
            payload: {
              source: {
                droppableId: source.droppableId,
                index: source.index,
              },
              destination: {
                droppableId: destination.droppableId,
                index: destination.index,
              },
            },
          })
        }}
      >
        <WrapperStyle
          customStyle={css`
            display: flex;
            align-items: flex-start;
          `}
        >
          <Droppable droppableId="task" direction="horizontal">
            {(droppableProvided) => (
              <WrapperStyle
                customStyle={css`
                  display: flex;
                  align-items: flex-start;
                  flex-wrap: wrap;
                  height: 100vh;
                `}
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
              >
                {list?.map((section, index) => (
                  <Draggable
                    key={section.id}
                    index={index}
                    draggableId={section.id}
                  >
                    {(draggableProvided: any) => (
                      <Column {...{ section, draggableProvided }} />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </WrapperStyle>
            )}
          </Droppable>
          {show ? (
            <AddNewItem
              placeholder="Enter a list name"
              {...{ setShow }}
              submit={(values) => {
                dispatch({
                  type: 'ADD_LIST',
                  payload: {
                    id: randomId(20),
                    title_list: values.name,
                  },
                })
                setShow(!show)
              }}
            />
          ) : (
            <ButtonComponent
              click={() => setShow(!show)}
              buttonName="+ Add new list"
            />
          )}
        </WrapperStyle>
      </DragDropContext>
    </main>
  )
}

export default Index
