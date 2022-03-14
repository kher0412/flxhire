import React, { useMemo } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ListItem, ListItemText } from '@material-ui/core'
import { toggleMobileDrawer as toggleMobileDrawerAction } from 'components/Layout/LayoutDucks'
import { useDispatchAction } from 'hooks'
import { extractQueryParams } from 'services/router'
import { isEmpty, isMatch } from 'lodash'
import Link from 'components/Link'
import styles from './CustomListItem.module.css'

interface ICustomListItem {
  href: string
  as?: string
  primary: string
  cyId?: string
  selected?: boolean
  children?: React.ReactNode
}

const CustomListItem: React.FunctionComponent<ICustomListItem> = (props: ICustomListItem) => {
  const { href, as = href, primary, cyId, children = <React.Fragment /> } = props
  const router = useRouter()
  const closeMobileDrawer = useDispatchAction(() => toggleMobileDrawerAction({ mobile: false }), [])

  const handleClick = () => {
    const shallow = href === router.pathname
    router.push(href, as, { shallow: shallow })
    closeMobileDrawer()
  }

  const selected = useMemo(() => {
    if (as === router.asPath) return true
    if (href !== router.pathname) return false

    const queryToMatch = extractQueryParams(as)
    if (isEmpty(queryToMatch)) return true
    const currentQuery = extractQueryParams(router.asPath)
    if (isEmpty(currentQuery)) return false

    return isMatch(currentQuery, queryToMatch)
  }, [as, router.asPath])

  return (
    <ListItem
      button
      selected={selected}
      classes={{
        root: styles.sidebarLink,
      }}
      className={clsx(styles.nested, styles.sidebarLink)}
      data-cy={cyId}
      onClick={handleClick}
      component={Link}
      href={as}
    >
      {children}
      <ListItemText primary={primary} />
    </ListItem>
  )
}

export default CustomListItem
