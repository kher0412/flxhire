import React from 'react'
import { Box } from 'components/themed'
import styles from './PageActionBar.module.css'

export interface IPageActionBarProps {

}

const PageActionBar: React.FunctionComponent<IPageActionBarProps> = (props) => {
  return (
    <div className={styles.actionBar}>
      <Box className={styles.box}>
        {props.children}
      </Box>
    </div>
  )
}

export default PageActionBar
