import { PureComponent } from 'react'
import { PageHeaderStepper, PageHeaderStep } from 'components'
import { IManageTab } from 'scenes/ClientManage/ManageDucks'
import { MANAGE_TABS } from '../../Manage'
import { ContainerProps } from './TabsContainer'

interface ITabsProps {
  tab: IManageTab
  setTab: (tab: IManageTab) => void
}

class Tabs extends PureComponent<ITabsProps & ContainerProps> {
  render() {
    const { tab, setTab, xEnablePayrollPage, xEnableExpensesPage, xEnableBonusesPage, invoicesCount, highlightedInvoicesCount } = this.props
    const currentStep = Object.keys(MANAGE_TABS).indexOf(tab)

    return (
      <PageHeaderStepper style={{ marginBottom: 48 }}>
        {Object.keys(MANAGE_TABS).map((tabName: IManageTab, tabIndex) => {
          // TODO: remove this line when payroll page is enabled permanently for prod
          if (tabName === 'payroll' && !xEnablePayrollPage) return null
          if (tabName === 'expenses' && !xEnableExpensesPage) return null
          if (tabName === 'bonuses' && !xEnableBonusesPage) return null

          const tabContent = MANAGE_TABS[tabName]
          const isActive = currentStep === tabIndex
          const TabIcon = tabContent.icon
          let count = 0
          let badgeCount = 0

          if (tabName === 'invoices') {
            badgeCount = highlightedInvoicesCount
            count = invoicesCount
          }

          return (
            <PageHeaderStep
              key={tabName}
              data-cy={`manage-navigation-${tabName}`}
              active={isActive}
              icon={<TabIcon />}
              onClick={() => setTab(tabName)}
              badge={badgeCount}
            >
              {tabContent.label} {count > 0 && `(${count})`}
            </PageHeaderStep>
          )
        })}
      </PageHeaderStepper>
    )
  }
}

export default Tabs
