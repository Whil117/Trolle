import AddNewItem from '@Components/AddNewItem/AddNewItem'
import ButtonComponent from '@Components/Button'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { Checklists } from '@Redux/reducers/pages/reducer'
import { ColumnStyle } from '@Styles/components/Column'
import randomId from '@Utils/random_id/random_id'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'

interface IProps {
  checklitsts: Checklists
  id_list: string | any
  id_list_item: string | any
}

const CheckListColumn: FC<IProps> = (props) => {
  const [show, setShow] = useState(false)
  const { dispatch } = useContext(AppContext)
  const router = useRouter()
  return (
    <ColumnStyle>
      <h4>{props.checklitsts.title_checklist}</h4>
      <div>
        {props.checklitsts.checklist?.map((item) => (
          <h4>{item.title}</h4>
        ))}
      </div>
      {show ? (
        <AddNewItem
          style={css`
            margin-top: 1rem;
          `}
          placeholder="Enter a checklist item"
          {...{ setShow }}
          submit={(values) => {
            dispatch({
              type: 'ADD_CHECKLIST_ITEM',
              payload: {
                id_list: props.id_list,
                id_list_item: props.id_list_item,
                id_checklist: props.checklitsts.id_checklist,
                id_checklist_item: randomId(20),
                title_checklist_item: values.name,
              },
            })
            setShow(!show)
          }}
        />
      ) : (
        <ButtonComponent
          buttonName="Add checklist item"
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

export default CheckListColumn
