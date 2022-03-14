import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { PageHeaderStepper, PageHeaderStep } from 'components'
import { HIRE_TABS, IHireTab } from '../../Hire'

interface ITabsProps {
  tab: IHireTab
  setTab: (tab: IHireTab) => void
}

const Tabs = (props: ITabsProps) => {
  const { tab, setTab } = props
  const badgeValues = {} // getBadgeValues(dataSets)

  return (
    <MediaQuery minWidth={601}>
      <PageHeaderStepper>
        {Object.keys(HIRE_TABS).filter(tabName => !HIRE_TABS[tabName].disabled).map((tabName: IHireTab) => {
          const tabContent = HIRE_TABS[tabName]
          const count = badgeValues[tabName] || 0
          const isActive = tabName === tab
          const Icon = tabContent.icon

          return (
            <PageHeaderStep
              key={tabName}
              active={isActive}
              icon={<Icon />}
              onClick={() => setTab(tabName)}
              data-cy={`hire-navigation-${tabName}`}
            >
              {tabContent.label} {(count > 0) && `(${count})`}
            </PageHeaderStep>
          )
        })}
      </PageHeaderStepper>
    </MediaQuery>
  )
}

export default Tabs
