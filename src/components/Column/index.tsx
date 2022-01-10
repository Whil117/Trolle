import AddNewItem from '@Components/AddNewItem/AddNewItem'
import AtomImage from '@Components/Atoms/Image'
import ButtonComponent from '@Components/Button'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { State } from '@Redux/reducers/pages/reducer'
import { ColumnStyle } from '@Styles/components/Column'
import randomId from '@Utils/random_id/random_id'
import { useRouter } from 'next/router'
import { FC, useContext, useState } from 'react'

interface IProps {
  section: State
}

const Column: FC<IProps> = (props) => {
  const [show, setShow] = useState(false)
  const { dispatch } = useContext(AppContext)
  const router = useRouter()
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
              display: flex;
              flex-direction: column;
              height: 100%;
            `}
            click={() =>
              router.push({
                pathname: '/view/[pid]',
                query: {
                  pid: props.section.id,
                  id: item.id_item,
                },
              })
            }
          >
            {item.image_item && (
              <AtomImage
                src={item.image_item}
                alt={item.title_item}
                width={350}
                height={300}
              />
            )}
          </ButtonComponent>
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
                id_item: randomId(20),
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
