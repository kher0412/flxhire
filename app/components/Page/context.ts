import React from 'react'
import { IPageContext } from './Page'

const PageContext = React.createContext({ sidebar: false } as IPageContext)
export default PageContext
