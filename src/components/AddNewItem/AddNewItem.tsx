import SvgDynamic from '@Components/Atoms/SvgDynamic'
import { css, SerializedStyles } from '@emotion/react'
import { ButtonStyle, WrapperStyle } from '@Styles/atoms/styles'
import {
  AddNewItemError,
  AddNewItemForm,
  AddNewItemFormButton,
  AddNewItemFormInput,
} from '@Styles/components/AddNewItem'
import { ErrorMessage, Formik } from 'formik'
import { Dispatch, FC, SetStateAction } from 'react'

interface IProps {
  placeholder: string
  setShow: Dispatch<SetStateAction<boolean>>
  submit: (value: { name: string }) => void
  style?: SerializedStyles
}

const AddNewItem: FC<IProps> = (props) => {
  return (
    <Formik
      initialValues={{ name: '' }}
      validate={(values) => {
        const errors: { [key: string]: string } = {}

        if (!values.name) {
          errors.name = 'Required'
        }
        return errors
      }}
      onSubmit={props.submit}
    >
      {({ values, errors }) => (
        <AddNewItemForm customStyle={props.style}>
          {console.log(values)}
          <AddNewItemFormInput
            type="text"
            placeholder={props.placeholder}
            name="name"
            id="name"
            autoComplete="off"
          />
          <ErrorMessage
            name="name"
            component={() => <AddNewItemError>{errors.name}</AddNewItemError>}
          />
          <WrapperStyle
            customStyle={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <AddNewItemFormButton type="submit">Add</AddNewItemFormButton>
            <ButtonStyle
              customStyle={css`
                background: none;
                border: none;
                cursor: pointer;
              `}
              onClick={() => props.setShow((show) => !show)}
            >
              <SvgDynamic href="/icons/cancel" />
            </ButtonStyle>
          </WrapperStyle>
        </AddNewItemForm>
      )}
    </Formik>
  )
}

export default AddNewItem
