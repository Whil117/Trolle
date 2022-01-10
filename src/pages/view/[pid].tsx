import AtomImage from '@Components/Atoms/Image'
import Column from '@Components/Column'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { ListItem, State } from '@Redux/reducers/pages/reducer'
import { WrapperStyle } from '@Styles/atoms/styles'
import { HeaderItem, HeaderTextArea } from '@Styles/pages/view'
import { NextPageContext } from 'next'
import { FC, useContext, useEffect, useState } from 'react'

interface IProps {
  pid: string | string[] | undefined
  id: string | string[] | undefined
}

const View: FC<IProps> = ({ pid, id }) => {
  const { list, dispatch } = useContext(AppContext)
  const [columnList, setColumnList] = useState<State[]>([])

  const [itemList, setItemList] = useState<ListItem | undefined>({} as ListItem)

  useEffect(() => {
    const itemList = list
      ?.filter((item) => item.id === pid)[0]
      .list?.filter((listItem) => listItem.id_item === id)[0]

    const columnList = list?.filter((item) => item.id === pid)
    setColumnList(columnList)
    setItemList(itemList)
  }, [list, pid, id])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file as Blob)
    reader.onloadend = (event) => {
      if (event.target) {
        dispatch({
          type: 'ADD_IMAGE_ITEM',
          payload: {
            id: columnList[0].id,
            id_item: itemList?.id_item,
            image_item: event.target.result as string,
          },
        })
      }
    }
  }

  return (
    <WrapperStyle
      customStyle={css`
        display: flex;
        justify-content: space-between;
        height: 100vh;
        padding: 50px;
      `}
    >
      <main>
        <HeaderItem>
          <WrapperStyle
            customStyle={css`
              margin: 0 20px 0 0;
            `}
          >
            <AtomImage
              src={itemList?.image_item || '/no-image.png'}
              alt="photoItem"
              width={300}
              height={300}
            />
          </WrapperStyle>
          <div>
            <h1>{itemList?.title_item}</h1>
            <HeaderTextArea
              name="description_item"
              id="description_item"
              cols={30}
              rows={10}
              onChange={(event) => {
                dispatch({
                  type: 'ADD_DESCRIPTION_ITEM',
                  payload: {
                    id: columnList[0].id,
                    id_item: itemList?.id_item,
                    description_item: event.target.value,
                  },
                })
              }}
              value={itemList?.description_item || ''}
              defaultValue={itemList?.description_item || ''}
            ></HeaderTextArea>
          </div>
        </HeaderItem>
        <input type="file" name="" id="" onChange={handleImage} />
      </main>
      <div>
        {columnList?.map((section) => (
          <Column key={section.id} {...{ section }} />
        ))}
      </div>
    </WrapperStyle>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  const { pid, id } = context.query
  return {
    props: {
      pid,
      id,
    },
  }
}
export default View
