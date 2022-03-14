import React, { useCallback, useEffect, useState } from 'react'
import { PageWrapper, PageContainer, Condition, PageHeader as PageHeaderV2, Suspense, LoadingPage } from 'components'
import { Page, PageHeader, PageHeaderTitle, PageHeaderDescription, PageHeaderBreadcrumbs, PageTabs, PageTab, PageBody, PageContent } from 'components/Layouts/V3'
import { graphql, usePreloadedQuery, PreloadedQuery, useQueryLoader, PreloadFetchPolicy } from 'react-relay'
import { Tabs, Tab, Card } from '@material-ui/core'
import { browserHistory } from 'services/router'
import { isClient, isMember } from 'services/user'
import { useRouter } from 'next/router'
import { Account_Query } from '__generated__/Account_Query.graphql'
import { PayingYouContainer_Query } from '__generated__/PayingYouContainer_Query.graphql'
import { PayingUsContainer_Query } from '__generated__/PayingUsContainer_Query.graphql'
import { EmailSettingsContainer_Query } from '__generated__/EmailSettingsContainer_Query.graphql'
import { CompanyTab_Query } from '__generated__/CompanyTab_Query.graphql'
import { useCurrentUser } from 'hooks'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MoneyIcon from '@material-ui/icons/Money'
import EmailIcon from '@material-ui/icons/Email'
import ReceiptIcon from '@material-ui/icons/Receipt'
import SettingsIcon from '@material-ui/icons/Settings'
import BusinessIcon from '@material-ui/icons/Business'
import ScheduleIcon from '@material-ui/icons/Schedule'

import styles from './Account.module.css'
import CompanyTab, { CompanyTabQuery } from './components/CompanyTab'
import EmailSettings, { EmailSettingsContainerQuery } from './components/EmailSettings'
import TaxCompliance from './components/TaxCompliance'
import PayingYou, { PayingYouContainerQuery } from './components/PayingYou'
import PlansForm from './components/PlansForm'
import PayingUs, { PayingUsContainerQuery } from './components/PayingUs'
import InvoicesForm from './components/InvoicesForm'
import SignableDocuments from './components/SignableDocuments'
import AccountTab from './components/AccountTab'

export type TabStep = 'settings' | 'company' | 'plans' | 'paying_us' | 'invoices' | 'paying_you' | 'tax_compliance' | 'email_settings' | 'contracts'
const commonTabs: TabStep[] = ['settings']
const clientTabs: TabStep[] = ['company', 'plans', 'paying_us', 'invoices']
const memberTabs: TabStep[] = ['paying_you', 'tax_compliance', 'email_settings']
const routesTabs: TabStep[] = [...commonTabs, ...clientTabs, ...memberTabs]

function isTabStep(tab: string): tab is TabStep {
  return routesTabs.indexOf(tab as any) >= 0
}

function redirectLegacyTabs(tab: any): TabStep {
  if (typeof tab === 'string') {
    if (tab === 'payoneer') return 'paying_you'
    if (tab === 'payments') return 'paying_us'
    if (tab === 'account') return 'settings'
    if (isTabStep(tab)) return tab
  }
  return 'settings'
}

export const AccountQuery = graphql`
  query Account_Query {
    currentUser {
      roles
      ...AccountTab_User
    }
  }
`

const TabTitlesMap: { [key in TabStep]: string } = {
  settings: 'Settings',
  company: 'Company',
  plans: 'Plans',
  paying_us: 'Paying us',
  invoices: 'Invoice Settings',
  paying_you: 'Paying you',
  tax_compliance: 'Taxes',
  email_settings: 'Emails',
  contracts: 'Contracts',
}

const TabDescriptionsMap: { [key in TabStep]: string } = {
  settings: 'Easily manage your core account settings',
  company: 'Set basic company information that gets displaye on all your open jobs',
  plans: 'Select or change the Flexhire plan for your company at any time. Note this is a company wide setting.',
  paying_us: 'Easily set the method of payment for your invoices - credit card or bank transfer via ACH or SEPA. You can add multiple payment methods and set one as default',
  invoices: 'Customize invoices you receive from Flexhire',
  paying_you: 'Choose your default payment mechanism to determine how we send you funds',
  tax_compliance: 'Help us ensure that you are tax compliant',
  email_settings: 'Manage the email you receive from Flexhire',
  contracts: 'My Contracts',
}

const Account = ({ preloadedQuery }: { preloadedQuery: PreloadedQuery<Account_Query> }) => {
  const data = usePreloadedQuery(AccountQuery, preloadedQuery)
  const user = data?.currentUser
  const router = useRouter()
  const [currentUser] = useCurrentUser()
  const [tab, setTabRaw] = useState<TabStep>(redirectLegacyTabs(router?.query?.tab))
  const [payingYouQuery, loadPayingYou] = useQueryLoader<PayingYouContainer_Query>(PayingYouContainerQuery)
  const [payingUsQuery, loadPayingUs] = useQueryLoader<PayingUsContainer_Query>(PayingUsContainerQuery)
  const [emailSettingsQuery, loadEmailSettings] = useQueryLoader<EmailSettingsContainer_Query>(EmailSettingsContainerQuery)
  const [companyTabQuery, loadCompanyTabQuery] = useQueryLoader<CompanyTab_Query>(CompanyTabQuery)

  useEffect(() => {
    const newTab = redirectLegacyTabs(router?.query?.tab)
    const options = { fetchPolicy: 'store-and-network' as PreloadFetchPolicy }
    if (newTab === 'paying_you') loadPayingYou({}, options)
    if (newTab === 'paying_us') loadPayingUs({}, options)
    if (newTab === 'email_settings') loadEmailSettings({}, options)
    if (newTab === 'company') loadCompanyTabQuery({}, options)
    setTabRaw(newTab)
  }, [router?.query?.tab])
  const reloadPayingUs = useCallback(() => loadPayingUs({}, { fetchPolicy: 'store-and-network' }), [loadPayingUs])

  const setTab = useCallback((newTab: TabStep) => {
    setTabRaw(newTab)
    browserHistory.push('/account/[tab]', `/account/${newTab}`, { shallow: true })
  }, [])
  const tabStyle = { color: '#333' }
  const iconStyle = { verticalAlign: 'middle', marginBottom: 2, marginRight: 6, fontSize: 18 }

  const breadcrumbsProps = [
    { id: 1, name: 'Account', href: '/account/settings' },
    { id: 2, name: TabTitlesMap[tab], href: `/account/${tab}` },
  ]

  const enableNewLayout = isClient(currentUser)

  const mainContent = (
    <div>
      <Condition condition={tab === 'settings'}>
        <AccountTab user={user} />
      </Condition>

      <Condition condition={tab === 'company'}>
        {companyTabQuery && <CompanyTab preloadedQuery={companyTabQuery} />}
      </Condition>

      <Condition condition={tab === 'plans'}>
        <PlansForm />
      </Condition>

      <Condition condition={tab === 'paying_us'}>
        {payingUsQuery && <PayingUs preloadedQuery={payingUsQuery} reload={reloadPayingUs} />}
      </Condition>

      <Condition condition={tab === 'invoices'}>
        <InvoicesForm />
      </Condition>

      <Condition condition={tab === 'contracts'}>
        <SignableDocuments />
      </Condition>

      <Condition condition={tab === 'paying_you'}>
        {payingYouQuery && <PayingYou preloadedQuery={payingYouQuery} />}
      </Condition>

      <Condition condition={tab === 'tax_compliance'}>
        <TaxCompliance />
      </Condition>

      <Condition condition={tab === 'email_settings'}>
        {emailSettingsQuery && <EmailSettings preloadedQuery={emailSettingsQuery} />}
      </Condition>
    </div>
  )

  return (
    <React.Fragment>
      {enableNewLayout && (
        <Page>
          <PageHeader>
            <PageHeaderTitle>{TabTitlesMap[tab]}</PageHeaderTitle>
            <PageHeaderDescription>{TabDescriptionsMap[tab]}</PageHeaderDescription>
            <PageHeaderBreadcrumbs breadcrumbs={breadcrumbsProps} />
          </PageHeader>

          <PageTabs
            value={tab}
            onChange={(e, newTab) => setTab(newTab as TabStep)}
            indicatorColor="primary"
            variant="scrollable"
            scrollButtons="on"
          >
            <PageTab
              key={0}
              label={(
                <div className={styles.iconTab}>
                  <SettingsIcon style={iconStyle} />
                  Settings
                </div>
              )}
              dataCy="account-navigation-account"
              value="settings"
              href="/account/settings"
            />

            {isClient(user as any) && [
              <PageTab
                key={1}
                label={(
                  <div className={styles.iconTab}>
                    <BusinessIcon style={iconStyle} />
                    Company
                  </div>
                )}
                dataCy="account-navigation-company"
                value="company"
                href="/account/company"
              />,
              <PageTab
                key={2}
                label={(
                  <div className={styles.iconTab}>
                    <ScheduleIcon style={iconStyle} />
                    Plans
                  </div>
                )}
                dataCy="account-navigation-plans"
                value="plans"
                href="/account/plans"
              />,
              <PageTab
                key={3}
                label={(
                  <div className={styles.iconTab}>
                    <AttachMoneyIcon style={iconStyle} />
                    Paying Us
                  </div>
                )}
                dataCy="account-navigation-paying-us"
                value="paying_us"
                href="/account/paying_us"
              />,
              <PageTab
                key={4}
                label={(
                  <div className={styles.iconTab}>
                    <ReceiptIcon style={iconStyle} />
                    Invoice Settings
                  </div>
                )}
                dataCy="account-navigation-invoices"
                value="invoices"
                href="/account/invoices"
              />,
            ]}

            {isMember(user as any) && [
              <PageTab
                key={5}
                label={(
                  <div className={styles.iconTab}>
                    <AttachMoneyIcon style={iconStyle} />
                    Paying You
                  </div>
                )}
                dataCy="account-navigation-paying-you"
                value="paying_you"
                href="/account/paying_you"
              />,
              <PageTab
                key={6}
                label={(
                  <div className={styles.iconTab}>
                    <MoneyIcon style={iconStyle} />
                    Taxes
                  </div>
                )}
                dataCy="account-navigation-tax-compliance"
                value="tax_compliance"
                href="/account/tax_compliance"
              />,
              <PageTab
                key={7}
                label={(
                  <div className={styles.iconTab}>
                    <EmailIcon style={iconStyle} />
                    Emails
                  </div>
                )}
                dataCy="account-navigation-email-settings"
                value="email_settings"
                href="/account/email_settings"
              />,
            ]}
          </PageTabs>

          <PageBody>
            <PageContent maxWidth="lg">
              <Card variant="outlined" elevation={0}>
                {mainContent}
              </Card>
            </PageContent>
          </PageBody>
        </Page>
      )}

      {!enableNewLayout && (
        <React.Fragment>
          <PageHeaderV2 compact />

          <PageContainer disableAlignContentToCenter={isClient(currentUser)}>
            <PageWrapper raised>
              <div>
                <Tabs
                  className={styles.tabs}
                  value={tab}
                  onChange={(e, newTab) => setTab(newTab as TabStep)}
                  indicatorColor="primary"
                  variant="scrollable"
                  scrollButtons="on"
                >
                  <Tab label="Account" style={tabStyle} data-cy="account-navigation-account" value="settings" />

                  {isClient(user as any) && [
                    <Tab label="Company" value="company" style={tabStyle} data-cy="account-navigation-company" />,
                    <Tab label="Plans" value="plans" style={tabStyle} data-cy="account-navigation-plans" />,
                    <Tab label="Paying Us" value="paying_us" style={tabStyle} data-cy="account-navigation-paying-us" />,
                    <Tab label="Invoices" value="invoices" style={tabStyle} data-cy="account-navigation-invoices" />,
                  ]}

                  {isMember(user as any) && [
                    <Tab label="Paying You" value="paying_you" style={tabStyle} data-cy="account-navigation-paying-you" />,
                    <Tab label="Taxes" value="tax_compliance" style={tabStyle} data-cy="account-navigation-tax-compliance" />,
                    <Tab label="Emails" value="email_settings" style={tabStyle} data-cy="account-navigation-email-settings" />,
                  ]}
                </Tabs>
              </div>

              <Suspense ssr fallback={<LoadingPage />}>
                {mainContent}
              </Suspense>
            </PageWrapper>
          </PageContainer>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Account
