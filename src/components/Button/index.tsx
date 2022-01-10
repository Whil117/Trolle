import { FC } from 'react'
import { ButtonStyle } from '@Styles/pages'
import { SerializedStyles } from '@emotion/react'

interface IProps {
  click?: () => void
  buttonName: string
  style?: SerializedStyles
}

const ButtonComponent: FC<IProps> = (props) => {
  return (
    <ButtonStyle onClick={props.click} customStyle={props.style}>
      {props.buttonName}
    </ButtonStyle>
  )
}

export default ButtonComponent
