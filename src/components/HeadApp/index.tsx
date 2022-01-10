import { FC } from 'react'
import Head from 'next/head'
import { Global } from '@emotion/react'
import { Normalize } from '@Styles/global/colors/normalize'
interface IProps {}

const HeadApp: FC<IProps> = (props) => {
  return (
    <Head>
      <title>Trolle</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
        rel="stylesheet"
      />
      <Global styles={Normalize} />
    </Head>
  )
}

export default HeadApp
