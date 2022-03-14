import React, { useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { List, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Collapse, Badge } from '@material-ui/core'
import { AttachMoney, MenuOpen, ExpandLess, ExpandMore, Work, People, LibraryBooks, StarBorder, Mic, ContactMail, GroupWork, Stars, Money, Receipt, Settings, Business, Schedule } from '@material-ui/icons'
import { Logo, DrawerLink, Condition } from 'components'
import { useCurrentUser, useDispatchAction, useLocalStorageItem, useOnMount } from 'hooks'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { RootState } from 'reducers'
import { isClient } from 'services/user'
import localStorage from 'services/localStorage'
import { toggleDesktopDrawer as toggleDesktopDrawerAction, toggleMobileDrawer as toggleMobileDrawerAction } from 'components/Layout/LayoutDucks'
import { trackError } from 'services/analytics'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { NavigationMenu_Query } from '__generated__/NavigationMenu_Query.graphql'
import { getBadgeData as getBadgeDataAction } from '../NavigationDucks'
import CustomListItem from '../../CustomListItem'
import styles from './NavigationMenu.module.css'

const iconStyle = { verticalAlign: 'middle', marginBottom: 2, marginRight: 4, fontSize: 22 }

const useStyles = makeStyles(() => createStyles({
  menuClose: {
    color: 'white',
  },
  activeList: {
    '& .Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.16)',
      fontWeight: 'bold',
      color: 'white',
      borderLeft: '2px solid white',
    },
    '& .Mui-selected:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.32)',
    },
  },
  sidebarDivider: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    margin: '12px 0px',
  },
}))

export type MenuSection = 'hire' | 'team' | 'account'

export type IDropdownState = {
  [key in MenuSection]: boolean
}

export const KEY_DROPDOWN_STATE = 'flexhire/common/KEY_DROPDOWN_STATE'

const NavigationMenu: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [user] = useCurrentUser()
  const variant = useSelector((state: RootState) => state.layout.sidebar.variant)
  const badgeData = useSelector((state: RootState) => state.navigation.badgeData)

  const data = useLazyLoadQuery<NavigationMenu_Query>(graphql`
    query NavigationMenu_Query {
      currentUser {
        managerContract {
          allowHireAccess
          allowManageAccess
        }
      }
    }
  `, {}, {
    fetchPolicy: 'store-and-network',
  })

  const getBadgeDatas = () => dispatch(getBadgeDataAction())
  const closeDesktopDrawer = useDispatchAction(() => toggleDesktopDrawerAction({ desktop: false }), [])
  const closeMobileDrawer = useDispatchAction(() => toggleMobileDrawerAction({ mobile: false }), [])

  const isSmallScreen = useMediaQuery('(max-width: 1200px)')
  const closeDrawer = () => {
    if (isSmallScreen) {
      closeMobileDrawer()
    } else {
      closeDesktopDrawer()
    }
  }

  const [savedDropdownState] = useLocalStorageItem<IDropdownState>(KEY_DROPDOWN_STATE, { default: { hire: false, team: false, account: false } })
  const [dropdownState, setDropdownState] = React.useState<IDropdownState>(savedDropdownState)
  useEffect(() => setDropdownState(savedDropdownState), [savedDropdownState])

  useOnMount(getBadgeDatas)

  const toggleCollapse = (collapse: MenuSection) => {
    setDropdownState({
      ...dropdownState,
      [collapse]: !dropdownState[collapse],
    })
  }

  React.useEffect(() => {
    try {
      localStorage.setItem(KEY_DROPDOWN_STATE, JSON.stringify(dropdownState))
    } catch (error) {
      trackError(error)
    }
  }, [dropdownState])

  const dueCount = badgeData?.unpaidInvoices || 0
  const overdueCount = badgeData?.overdueInvoices || 0
  const timesheetCount = badgeData?.timesheetCount || 0
  const count = overdueCount + dueCount + timesheetCount
  const badgeColor = overdueCount > 0 ? 'secondary' : 'primary'

  const showTeamManagement = data?.currentUser?.managerContract?.allowManageAccess
  const showHirePipeline = data?.currentUser?.managerContract?.allowHireAccess

  return (
    <React.Fragment>
      <div className={styles.drawerHeader}>
        <div className={styles.logo} style={(variant === 'primary') ? undefined : { filter: 'invert(100%)' }}>
          <DrawerLink href="/client/dashboard" data-cy="sidebar-client-navigation-dashboard">
            <Logo user={user} sidebar={isClient(user)} />
          </DrawerLink>
        </div>

        <IconButton onClick={closeDrawer} data-cy="close-drawer">
          <MenuOpen classes={{ root: classes.menuClose }} />
        </IconButton>
      </div>

      <Divider />

      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={clsx(classes.activeList, styles.menuList)}
      >
        <Condition condition={showHirePipeline}>
          <ListItem button onClick={() => toggleCollapse('hire')} className={styles.nested} data-cy="client-hire-overview">
            <ListItemText primary="Recruitment Pipeline" />
            {dropdownState.hire ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={dropdownState.hire} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CustomListItem href="/client/hire" as="/client/hire?tab=jobs" primary="Jobs" cyId="hire-overview-jobs">
                <ListItemIcon>
                  <Work style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/hire" as="/client/hire?tab=potential" primary="Candidates" cyId="hire-overview-candidates">
                <ListItemIcon>
                  <People style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/hire" as="/client/hire?tab=applicants" primary="Applications" cyId="hire-overview-applicants">
                <ListItemIcon>
                  <LibraryBooks style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/hire" as="/client/hire?tab=screening" primary="Screening" cyId="hire-overview-screening">
                <ListItemIcon>
                  <StarBorder style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/hire" as="/client/hire?tab=interviews" primary="Interviews" cyId="hire-overview-interviews">
                <ListItemIcon>
                  <Mic style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/hire" as="/client/hire?tab=offers" primary="Offers" cyId="hire-overview-offers">
                <ListItemIcon>
                  <ContactMail style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>
            </List>
          </Collapse>
        </Condition>
        <CustomListItem href={`/${user.firm?.slug}`} as={`/${user.firm?.slug}`} primary="My Open Positions" cyId="client-navigation-company" />

        <Condition condition={showTeamManagement}>
          <Divider classes={{ root: classes.sidebarDivider }} />
          <ListItem button onClick={() => toggleCollapse('team')} className={styles.nested} data-cy="client-team-overview">
            <ListItemText primary="Team Management" />
            <Badge
            badgeContent={count}
            color={badgeColor}
            data-cy={count ? 'notification-badge-total' : undefined}
            data-value={count}
          >
              {dropdownState.team ? <ExpandLess /> : <ExpandMore />}
            </Badge>
          </ListItem>
          <Collapse in={dropdownState.team} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <CustomListItem href="/client/manage" as="/client/manage?tab=team" primary="Team" cyId="team-overview-team">
                <ListItemIcon>
                  <GroupWork style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <CustomListItem href="/client/manage" as="/client/manage?tab=work" primary="Work reports" cyId="team-overview-reports">
                <ListItemIcon>
                  <ContactMail style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>

              <Condition condition={user?.configuration?.enable_expenses_page}>
                <CustomListItem href="/client/manage" as="/client/manage?tab=expenses" primary="Expenses" cyId="team-overview-expenses">
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                </CustomListItem>
              </Condition>

              <Condition condition={user?.configuration?.enable_bonuses_page}>
                <CustomListItem href="/client/manage" as="/client/manage?tab=bonuses" primary="Bonuses" cyId="team-overview-bonuses">
                  <ListItemIcon>
                    <Stars style={iconStyle} />
                  </ListItemIcon>
                </CustomListItem>
              </Condition>

              <Condition condition={user?.configuration?.enable_payroll_page}>
                <CustomListItem href="/client/manage" as="/client/manage?tab=payroll" primary="Payroll" cyId="team-overview-payroll">
                  <ListItemIcon>
                    <Money style={iconStyle} />
                  </ListItemIcon>
                </CustomListItem>
              </Condition>

              <CustomListItem href="/client/manage" as="/client/manage?tab=invoices" primary="Invoices" cyId="team-overview-invoices">
                <ListItemIcon>
                  <Receipt style={iconStyle} />
                </ListItemIcon>
              </CustomListItem>
            </List>
          </Collapse>
        </Condition>

        <Divider classes={{ root: classes.sidebarDivider }} />

        <ListItem button onClick={() => toggleCollapse('account')} className={styles.nested}>
          <ListItemText primary="Account" />
          {dropdownState.account ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={dropdownState.account} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <CustomListItem href="/account/settings" primary="Settings" cyId="account-overview-settings">
              <ListItemIcon>
                <Settings style={iconStyle} />
              </ListItemIcon>
            </CustomListItem>

            <CustomListItem href="/account/company" primary="Company" cyId="account-overview-company">
              <ListItemIcon>
                <Business style={iconStyle} />
              </ListItemIcon>
            </CustomListItem>

            <CustomListItem href="/account/plans" primary="Plans" cyId="account-overview-plans">
              <ListItemIcon>
                <Schedule style={iconStyle} />
              </ListItemIcon>
            </CustomListItem>

            <CustomListItem href="/account/paying_us" primary="Paying us" cyId="account-overview-paying">
              <ListItemIcon>
                <AttachMoney style={iconStyle} />
              </ListItemIcon>
            </CustomListItem>

            <CustomListItem href="/account/invoices" primary="Invoice Settings" cyId="account-overview-invoices">
              <ListItemIcon>
                <Receipt style={iconStyle} />
              </ListItemIcon>
            </CustomListItem>
          </List>
        </Collapse>
        {process.env.FLEXHIRE_ENABLE_BLOG && (
          <CustomListItem href="/blog" primary="Blog" cyId="client-navigation-blog" />
        )}
      </List>
    </React.Fragment>
  )
}

export default NavigationMenu
