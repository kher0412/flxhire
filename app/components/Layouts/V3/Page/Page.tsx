import React from 'react'
import { classList } from 'services/styles'
import PageContext from '../context'
import styles from './Page.module.css'

export interface IPageProps {
  children?: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

function Page(props: IPageProps) {
  const { className, children, ...restProps } = props
  const [secondarySidebarOpen, setSecondarySidebarOpen] = React.useState(false)

  return (
    <div className={classList(styles.container, className)} {...restProps}>
      <PageContext.Provider value={{ secondarySidebarOpen: secondarySidebarOpen, setSecondarySidebarOpen: setSecondarySidebarOpen }}>
        {children}
      </PageContext.Provider>
    </div>
  )
}

export default React.memo(Page)
