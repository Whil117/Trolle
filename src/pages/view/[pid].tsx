import AddNewItem from '@Components/AddNewItem/AddNewItem'
import AtomImage from '@Components/Atoms/Image'
import SvgDynamic from '@Components/Atoms/SvgDynamic'
import ButtonComponent from '@Components/Button'
import CheckListColumn from '@Components/ChecklistColumn'
import Column from '@Components/Column'
import { css } from '@emotion/react'
import AppContext from '@Hooks/AppContext/AppContext'
import { ListItem, State } from '@Redux/reducers/pages/reducer'
import { WrapperStyle } from '@Styles/atoms/styles'
import {
  HeaderInput,
  HeaderItem,
  HeaderTextArea,
  ViewContainer,
  ViewLabel,
} from '@Styles/pages/view'
import randomId from '@Utils/random_id/random_id'
import { NextPageContext } from 'next'
import { FC, useContext, useEffect, useState } from 'react'

interface IProps {
  pid: string | string[] | undefined
  id: string | string[] | undefined
}

const View: FC<IProps> = ({ pid, id }) => {
  const { list, dispatch } = useContext(AppContext)
  const [columnList, setColumnList] = useState<State[]>([])
  const [show, setShow] = useState(false)
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
  console.log(columnList)

  return (
    <WrapperStyle
      customStyle={css`
        display: flex;
        justify-content: space-between;
        height: 100vh;
        padding: 50px;
      `}
    >
      <ViewContainer>
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
          <WrapperStyle
            customStyle={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <HeaderInput
              type="text"
              name="title_item"
              id="title_item"
              value={itemList?.title_item}
              onChange={(event) => {
                dispatch({
                  type: 'UPLOAD_TITLE_ITEM',
                  payload: {
                    id: columnList[0].id,
                    id_item: itemList?.id_item,
                    title_item: event.target.value,
                  },
                })
              }}
            />
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
          </WrapperStyle>
        </HeaderItem>
        <WrapperStyle
          customStyle={css`
            display: flex;
          `}
        >
          <ViewLabel htmlFor="image">
            <SvgDynamic
              href="/icons/clip"
              customStyle={css`
                display: flex;
                align-items: center;
                width: 30px;
                height: 30px;
                svg {
                  path {
                    fill: #ffffff;
                  }
                }
              `}
            />
            Add Image
          </ViewLabel>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleImage}
            style={{ display: 'none' }}
          />
        </WrapperStyle>
        <main>
          <WrapperStyle
            customStyle={css`
              display: flex;
              align-items: center;
            `}
          >
            <SvgDynamic
              href="/icons/checklist"
              customStyle={css`
                width: 30px;
                height: 30px;
                svg {
                  g {
                    path {
                      fill: black;
                    }
                  }
                }
              `}
            />
            <h3>Checklist</h3>
          </WrapperStyle>
          <WrapperStyle
            customStyle={css`
              display: flex;
              align-items: flex-start;
              flex-wrap: wrap;
            `}
          >
            {itemList?.checklists?.map((checklitsts) => (
              <CheckListColumn
                {...{
                  checklitsts,
                  id_list: pid,
                  id_list_item: itemList?.id_item,
                }}
              />
            ))}
            {show ? (
              <AddNewItem
                placeholder="Enter a checklist item"
                {...{ setShow }}
                submit={(values) => {
                  dispatch({
                    type: 'ADD_CHECKLIST',
                    payload: {
                      id_list: pid,
                      id_list_item: itemList?.id_item,
                      id_checklist: randomId(20),
                      title_checklist: values.name,
                    },
                  })
                  setShow(!show)
                }}
              />
            ) : (
              <ButtonComponent
                click={() => setShow(!show)}
                buttonName="+ Add check list"
              />
            )}
          </WrapperStyle>
        </main>
      </ViewContainer>
      <div>
        {columnList?.map((section) => (
          <Column key={section.id} {...{ section, id }} />
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
