import React from 'react'
import { Typography } from '@material-ui/core'

interface IPageHeaderDescriptionProps {
  children: React.ReactNode
}

const PageHeaderDescription: React.FunctionComponent<IPageHeaderDescriptionProps> = (props: IPageHeaderDescriptionProps) => {
  const { children } = props

  return (
    <div style={{ margin: '9px 0 0 0' }}>
      <Typography variant="body2">
        {children}
      </Typography>
    </div>
  )
}

export default PageHeaderDescription
