import styled from '@emotion/styled'
import colors from '@Styles/global/colors'
import CustomStyled from '@Types/styles/types'
import { Field, Form } from 'formik'

export const AddNewItemForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 317px;
  /* height: 100px; */
  justify-content: space-between;
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  padding:10px;
  border-radius: 10px;
  ${({ customStyle }: CustomStyled) => customStyle})}
`

export const AddNewItemFormInput = styled(Field)`
  border: 1px solid #4ed72c;
  box-sizing: border-box;
  border-radius: 10px;
  height: 50px;
  outline: none;
  margin:0 0 10px 0;
    font-size: 16px;
    padding: 5px 10px;
  ${({ customStyle }: CustomStyled) => customStyle})}
`

export const AddNewItemFormButton = styled.button`
    border:none;
    width: 100px;
    padding: 10px 15px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    color: ${colors?.text?.primary};
    background: ${colors?.buttons?.primary}}};
      ${({ customStyle }: CustomStyled) => customStyle})}
  `
export const AddNewItemError = styled.p`
  color: red;
  font-size: 12px;
  font-weight: 500;
  margin: 0 0 10px 0;
  padding: 0;
`
