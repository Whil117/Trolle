import AddNewItem from '@Components/AddNewItem/AddNewItem'
import ButtonComponent from '@Components/Button'
import Column from '@Components/Column'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { WrapperStyle } from '@Styles/atoms/styles'
import randomId from '@Utils/random_id/random_id'
import type { NextPage } from 'next'
import { useContext, useState } from 'react'

const Index: NextPage = () => {
  const [show, setShow] = useState(false)
  const { list, dispatch } = useContext(AppContext)
  return (
    <main>
      <h1>Trolle App</h1>
      <WrapperStyle
        customStyle={css`
          display: flex;
          align-items: flex-start;
          flex-wrap: wrap;
        `}
      >
        {list?.map((section) => (
          <Column key={section.id} {...{ section }} />
        ))}
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
    </main>
  )
}

export default Index
