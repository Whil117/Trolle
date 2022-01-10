export type Colors = {
  background?: {
    [key: string]: string
  }
  buttons?: {
    [key: string]: string
  }
  text?: {
    [key: string]: string
  }
}

const colors: Colors = {
  buttons: {
    primary: '#4ED72C',
  },
  text: {
    primary: 'white',
  },
}
export default colors
