import React from 'react'

export interface IPageContext {
  secondarySidebarOpen: boolean
  setSecondarySidebarOpen: (isOpen: boolean) => void
}

const PageContext = React.createContext<IPageContext>({ secondarySidebarOpen: false, setSecondarySidebarOpen: () => { } })

export default PageContext
