import { Badge, BottomNavigation, BottomNavigationAction } from '@material-ui/core'
import { MediaQuery } from 'components'
import { HIRE_TABS, IHireTab } from '../Hire'
import styles from '../Hire.module.css'

interface IHireBottomNavigationProps {
  tab: IHireTab
  setTab: (tab: IHireTab) => void
}

const HireBottomNavigation = ({ tab, setTab }: IHireBottomNavigationProps) => {
  const badgeValues = {} // getBadgeValues(dataSets)

  return (
    <MediaQuery maxWidth={600}>
      <BottomNavigation
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
        showLabels
        className={styles['bottom-navigation']}
      >
        {Object.keys(HIRE_TABS).filter(tabName => !HIRE_TABS[tabName].disabled).map((tabName) => {
          const tabContent = HIRE_TABS[tabName]
          const IconComponent = tabContent.mobileIcon
          const count = badgeValues[tabName]
          const icon = count > 0 ? (<Badge color="secondary" badgeContent={count}><IconComponent /></Badge>) : <IconComponent />
          const isSelected = (tab === tabName)
          const label = tabContent.mobileLabel || tabContent.label || ''

          return (
            <BottomNavigationAction
              className={styles.bottomNavItem}
              style={isSelected ? undefined : { width: 48, minWidth: 48 }}
              key={tabName}
              value={tabName}
              label={isSelected ? label : '\u00A0'}
              icon={icon}
              data-cy={`hire-navigation-${tabName}`}
            />
          )
        })}
      </BottomNavigation>
    </MediaQuery>
  )
}

export default HireBottomNavigation
