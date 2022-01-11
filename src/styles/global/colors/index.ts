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
  background: {
    primary: '#2C5CD7',
    secondary: '#2CD7C2',
  },
}
export default colors
