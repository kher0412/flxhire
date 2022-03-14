import React from 'react'
import { Button } from 'components/themed'
import { IButtonProps } from 'components/themed/Button/Button'
import { usePageState } from 'hooks/usePageState'

export interface IPageSidebarButtonProps extends IButtonProps {

}

function PageSidebarButton(props: IPageSidebarButtonProps) {
  const { ...restProps } = props
  const { pageSidebarHidden, setPageSidebarOpen } = usePageState()

  if (!pageSidebarHidden) return null

  return (
    <Button
      {...restProps}
      onClick={() => setPageSidebarOpen(true)}
    />
  )
}

export default React.memo(PageSidebarButton)
