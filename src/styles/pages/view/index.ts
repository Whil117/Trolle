import styled from '@emotion/styled'
import colors from '@Styles/global/colors'

export const HeaderItem = styled.header`
  display: flex;
  width: 100%;
  /* justify-content: space-between; */
`

export const HeaderInput = styled.input`
  font-size: 24px;
  font-weight: 600;
  border: none;
  background: none;
  margin: 15px 0;
`
export const HeaderTextArea = styled.textarea`
  width: 537px;
  height: 135px;
  resize: none;
  border-radius: 10px;
  border: none;
  outline: none;
  font-family: 'Roboto', sans-serif;
  padding: 10px;
  font-size: 16px;
  line-height: 25px;
  opacity: 0.75;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`

export const ViewContainer = styled.main`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`
export const ViewLabel = styled.label`
  background: ${colors?.background?.secondary};
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: 600;
  color: ${colors?.text?.primary};
`
