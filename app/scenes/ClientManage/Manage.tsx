import React, { useCallback, useEffect, useState } from 'react'
import { Condition, Suspense, SuspensePlaceholder, ConditionSwitch, PagePlaceholder } from 'components'
import { PageBody, PageTabs, PageTab, PageLoadingIndicator } from 'components/Layouts/V3'
import GroupWorkIcon from '@material-ui/icons/GroupWork'
import ContactMailIcon from '@material-ui/icons/ContactMail'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import ReceiptIcon from '@material-ui/icons/Receipt'
import { extractQueryParams, buildQueryParams } from 'services/router'
import { useOnMount } from 'hooks'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { Manage_Query } from '__generated__/Manage_Query.graphql'
import { Currency } from 'types'
import { Money, Stars } from '@material-ui/icons'
import TeamIcon from './components/TabSwitcher/components/TeamIcon'
import WorkIcon from './components/TabSwitcher/components/WorkIcon'
import PaymentIcon from './components/TabSwitcher/components/PaymentIcon'
import { IManageFilterParams, IManageTab } from './ManageDucks'
import TeamTab from './components/TeamTab'
import WorkTab from './components/WorkTab'
import PaymentsTab from './components/PaymentsTab'
import { ContainerProps } from './ManageContainer'
import { TeamSubtabName } from './components/TeamTab/teamSubtabName'
import PayrollTab from './components/PayrollTab'
import ExpensesTab from './components/ExpensesTab'
import styles from './Manage.module.css'
import BonusesTab from './components/BonusesTab'

export type IManageTabs = {
  [name in IManageTab]: {
    label: string
    icon: any
    jobRequired?: boolean
    mobileIcon?: any
    mobileLabel?: string
    dataSource?: string
    infoMessage?: string
    noResultsTitle?: string
    noResultsSubtitle?: string
  }
}

export const TabTitlesMap: { [key in IManageTab]: string } = {
  team: 'Team',
  expenses: 'Expenses',
  work: 'Work reports',
  invoices: 'Invoices',
  payroll: 'Payroll',
  bonuses: 'Bonuses',
}

export const TabDescriptionsMap: { [key in IManageTab]: string } = {
  team: 'This is your team page. From here you can manage your team member\'s contracts and also invite new members to join your team',
  expenses: 'View, approve or reject any expenses from your team. Once approved they will move to the Payroll tab for invoice and payment processing',
  work: 'This is your team\'s work reports page. From here you can review, approve, reject and give feedback on their work',
  invoices: 'This is your invoices page. From here you can easily review and pay your invoices. Pay in one click using credit card, ACH in the US, or SEPA in Europe ',
  payroll: 'All approved payroll items (salaries, expenses and bonuses) appear here. Schedule the recurring date they get automatically invoiced or select, invoice and pay them immediately.',
  bonuses: 'All bonuses (approved and pending) appear here. Grant one-time bonuses with one click or review, approve, or reject pending bonuses.',
}

export const DEFAULT_TAB = 'team' as IManageTab

export const MANAGE_TABS: IManageTabs = {
  team: {
    label: 'Team',
    icon: TeamIcon,
  },
  work: {
    label: 'Work',
    icon: WorkIcon,
  },
  bonuses: {
    label: 'Bonuses',
    icon: PaymentIcon,
  },
  expenses: {
    label: 'Expenses',
    icon: PaymentIcon,
  },
  payroll: {
    label: 'Payroll',
    icon: PaymentIcon,
  },
  invoices: {
    label: 'Invoices',
    icon: PaymentIcon,
  },
}

export const TIMESHEET_CLIENT_STATUSES = [
  { value: 'pending', display: 'Draft' },
  { value: 'submitted', display: 'Submitted' },
  { value: 'client_query', display: 'Client Query' },
  { value: 'approved', display: 'Approved' },
  { value: 'rejected', display: 'Rejected' },
  { value: 'paid', display: 'Paid' },
  { value: 'payout_failed', display: 'Payout Failed' },
  { value: 'void', display: 'Void' },
]

export const INVOICE_STATUSES = [
  { value: 'paid', display: 'Paid' },
  { value: 'payment_processing', display: 'Payment Processing' },
  { value: 'overdue', display: 'Overdue' },
  { value: 'requested', display: 'Requested' },
  { value: 'not_requested', display: 'Not Requested' },
]

function getBadgeValue(...args) {
  // This just counts the number of truthy arguments
  const count = args.filter(x => !!x).length
  return count
}

export function activeFilterCount(filterParams: IManageFilterParams, tab = DEFAULT_TAB) {
  if (!tab || !filterParams) return 0

  let value = getBadgeValue(filterParams.clientId)

  if (tab !== 'invoices') {
    value += getBadgeValue(filterParams.name)
  }

  if (tab === 'team') {
    value += getBadgeValue(
      filterParams.contractsStatus,
      filterParams.jobId,
    ) + (filterParams.tags?.length || 0) + (filterParams.skills?.length || 0)
  }

  if (tab === 'work' || tab === 'invoices') {
    value += getBadgeValue(filterParams.fromDate || filterParams.toDate)
  }

  if (tab === 'work') {
    value += getBadgeValue(
      filterParams.timesheetsStatus,
      filterParams.invoiceId,
    ) + (filterParams.tags?.length || 0)
  }

  if (tab === 'invoices') {
    value += getBadgeValue(
      filterParams.invoicesStatus,
      filterParams.invoiceNo,
      filterParams.total,
    )
  }

  return value
}

function Manage(props: ContainerProps) {
  const {
    // TODO: bloat lord props destruct, clean this up
    tab = DEFAULT_TAB,
    router,
    toggleSelection,
    teamBulkActions,
    setBulkActionParam,
    performBulkAction,
    performBulkEmail,
    clearSelection,
    filterParams,
    toggleBulkEdit,
    setFilter,
    invoicesReceived,
    invoices,
    invoicesExist,
    invoicesPagination,
    invoicesTotalUnpaid,
    invoicesTotalOverdue,
    invoicesTotalCurrency,
    setTab,
    clearFilterParams,
    getInvoices,
    user,
  } = props

  const [innerTeamTabName, setInnerTeamTabName] = useState<TeamSubtabName>('individuals')

  const refresh = useCallback(() => {
    // TODO: this all has to go in favor of graphql
    getInvoices()
  }, [])

  // NOTE: only useOnMount and useEffect should use setTab from container, everything else should use this
  const setRouterTab = (newTab: string) => {
    if (newTab !== tab) {
      router.push('/client/manage', `/client/manage?${buildQueryParams({ ...router.query, tab: newTab })}`, { shallow: true })
    }
  }

  const onChangePage = (targetTab: IManageTab) => value => props.onChangePage(targetTab, value)

  const onChangeRowsPerPage = (targetTab: IManageTab) => value => props.onChangeRowsPerPage(targetTab, value)

  const sortBy = (targetTab: IManageTab) => value => props.sortBy(targetTab, value)

  useOnMount(() => {
    const query = extractQueryParams(router.asPath)
    const tabParam = query.tab

    if (tabParam !== tab) setTab(tabParam)

    if (query.filters === 'clear') {
      clearFilterParams()
      setFilter('clientId', null)
    }

    if (query.invoice) setFilter('invoiceId', query.invoice)
    if (query.invoicesStatus) setFilter('invoicesStatus', query.invoicesStatus)
    if (query.timesheetsStatus) setFilter('timesheetsStatus', query.timesheetsStatus)
    if (query.name) setFilter('name', query.name)
    if (query.clientId) setFilter('clientId', query.clientId === 'null' ? null : query.clientId)
    if (query.contractsStatus) setFilter('contractsStatus', query.contractsStatus === 'null' ? null : query.contractsStatus)
    refresh()
  })

  useEffect(() => {
    // patch up reacting to a changing tab query param
    const { setTab: setTabContainer, tab: currentTab, router: currentRouter } = props
    const query = extractQueryParams(currentRouter.asPath)

    if (query.tab && query.tab !== currentTab) {
      setTabContainer(query.tab)
    }
  })

  const data = useLazyLoadQuery<Manage_Query>(graphql`
    query Manage_Query {
      currentUser {
        firm {
          ...TeamTab_Firm
          ...PaymentsTab_Firm
        }
        managerContract {
          allowManageAccess
        }
        ...PaymentsTab_User
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
    fetchKey: teamBulkActions.graphFetchKey,
  })

  const firm = data?.currentUser?.firm
  const accessAllowed = data?.currentUser?.managerContract?.allowManageAccess
  const iconStyle = { verticalAlign: 'middle', marginBottom: 2, marginRight: 6, fontSize: 18 }

  return (
    <React.Fragment>
      <PageTabs
        value={tab}
        onChange={(e, newTab) => setRouterTab(newTab as IManageTab)}
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="on"
      >
        <PageTab
          label={(
            <div className={styles.iconTab}>
              <GroupWorkIcon style={iconStyle} />
              Team
            </div>
          )}
          dataCy="manage-navigation-team"
          value="team"
          href="/client/manage"
          as="/client/manage?tab=team"
        />

        <PageTab
          label={(
            <div className={styles.iconTab}>
              <ContactMailIcon style={iconStyle} />
              Work reports
            </div>
          )}
          dataCy="manage-navigation-work"
          value="work"
          href="/client/manage"
          as="/client/manage?tab=work"
        />

        {user?.configuration?.enable_expenses_page && (
          <PageTab
            label={(
              <div className={styles.iconTab}>
                <AttachMoneyIcon style={iconStyle} />
                Expenses
              </div>
            )}
            dataCy="manage-navigation-expenses"
            value="expenses"
            href="/client/manage"
            as="/client/manage?tab=expenses"
          />
        )}

        {user?.configuration?.enable_bonuses_page && (
          <PageTab
            label={(
              <div className={styles.iconTab}>
                <Stars style={iconStyle} />
                Bonuses
              </div>
            )}
            dataCy="manage-navigation-bonuses"
            value="bonuses"
            href="/client/manage"
            as="/client/manage?tab=bonuses"
          />
        )}

        {user?.configuration?.enable_payroll_page && (
          <PageTab
            label={(
              <div className={styles.iconTab}>
                <Money style={iconStyle} />
                Payroll
              </div>
            )}
            dataCy="manage-navigation-payroll"
            value="payroll"
            href="/client/manage"
            as="/client/manage?tab=payroll"
          />
        )}

        <PageTab
          label={(
            <div className={styles.iconTab}>
              <ReceiptIcon style={iconStyle} />
              Invoices
            </div>
          )}
          dataCy="manage-navigation-invoices"
          value="invoices"
          href="/client/manage"
          as="/client/manage?tab=invoices"
        />
      </PageTabs>

      <PageBody>
        <Suspense fallback={<PageLoadingIndicator />} ErrorFallbackComponent={errorProps => <SuspensePlaceholder {...errorProps} raised={false} flat />}>
          <ConditionSwitch>
            <Condition condition={!accessAllowed}>
              <PagePlaceholder
                title="Access Denied"
                subtitle="Your manager has disabled access to this page for your account."
                raised
                {...props}
              />
            </Condition>

            <Condition condition={tab === 'team'}>
              <TeamTab
                innerTabName={innerTeamTabName}
                setInnerTabName={setInnerTeamTabName}
                graphFetchKey={teamBulkActions.graphFetchKey}
                firm={firm}
                toggleSelection={toggleSelection}
                toggleBulkEdit={toggleBulkEdit}
                setFilter={setFilter}
                bulkActions={teamBulkActions}
                setBulkActionParam={setBulkActionParam}
                performBulkAction={performBulkAction}
                performBulkEmail={performBulkEmail}
                clearSelection={clearSelection}
                filterParams={filterParams}
              />
            </Condition>

            <Condition condition={tab === 'expenses'}>
              <ExpensesTab />
            </Condition>

            <Condition condition={tab === 'work'}>
              <WorkTab />
            </Condition>

            <Condition condition={tab === 'bonuses'}>
              <BonusesTab />
            </Condition>

            <Condition condition={tab === 'payroll'}>
              <PayrollTab refresh={refresh} />
            </Condition>

            <Condition condition={tab === 'invoices'}>
              <PaymentsTab
                userFragmentRef={data?.currentUser}
                firmFragmentRef={firm}
                invoices={invoices}
                invoicesReceived={invoicesReceived}
                invoicesExist={invoicesExist}
                invoicesPagination={invoicesPagination}
                invoicesTotalUnpaid={invoicesTotalUnpaid}
                invoicesTotalOverdue={invoicesTotalOverdue}
                invoicesTotalCurrency={invoicesTotalCurrency ? { code: invoicesTotalCurrency } as Currency : null}
                onChangePage={onChangePage('invoices')}
                onChangeRowsPerPage={onChangeRowsPerPage('invoices')}
                sortBy={sortBy('invoices')}
              />
            </Condition>
          </ConditionSwitch>
        </Suspense>
      </PageBody>
    </React.Fragment>
  )
}

export default React.memo(Manage)
