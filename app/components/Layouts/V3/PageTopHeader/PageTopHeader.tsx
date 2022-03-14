import { Box } from 'components/themed'
import React from 'react'
import styles from './PageTopHeader.module.css'

interface IPageTopHeaderProps {
  children: React.ReactNode,
}

const PageTopHeader: React.FunctionComponent<IPageTopHeaderProps> = (props: IPageTopHeaderProps) => {
  const { children } = props

  return (
    <div className={styles.container}>
      <Box>
        {children}
      </Box>
    </div>
  )
}

export default PageTopHeader
