import AddNewItem from '@Components/AddNewItem/AddNewItem'
import ButtonComponent from '@Components/Button'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { State } from '@Redux/reducers/pages/reducer'
import { ColumnStyle } from '@Styles/components/Column'
import randomId from '@Utils/random_id/random_id'
import { FC, useContext, useState } from 'react'

interface IProps {
  section: State
}

const Column: FC<IProps> = (props) => {
  const [show, setShow] = useState(false)
  const { dispatch } = useContext(AppContext)
  return (
    <ColumnStyle>
      <h4>{props.section.title_list}</h4>
      <div>
        {props?.section?.list?.map((item) => (
          <ButtonComponent
            key={item.id_item}
            buttonName={item.title_item}
            style={css`
              background: #ffffff;
              font-size: 1rem;
              font-weight: 00;
              margin: 0.5rem 0;
            `}
            // click={() => setShow(!show)}
          />
        ))}
      </div>
      {show ? (
        <AddNewItem
          style={css`
            margin-top: 1rem;
          `}
          placeholder="Enter a item name"
          {...{ setShow }}
          submit={(values) => {
            dispatch({
              type: 'ADD_ITEM_LIST',
              payload: {
                id: props.section.id,
                id_item: randomId(10),
                title_item: values.name,
              },
            })
            setShow(!show)
          }}
        />
      ) : (
        <ButtonComponent
          buttonName="Add new item"
          style={css`
            background: #f5f5f5;
            font-size: 1rem;
            font-weight: 00;
            margin-top: 1rem;
          `}
          click={() => setShow(!show)}
        />
      )}
    </ColumnStyle>
  )
}

export default Column
