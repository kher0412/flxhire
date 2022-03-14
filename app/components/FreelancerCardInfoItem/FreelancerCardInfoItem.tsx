import React from 'react'
import { ListItem, ListItemIcon, ListItemText, List, Badge, ListItemProps, BadgeProps } from '@material-ui/core'
import { ArrowDropDown } from '@material-ui/icons'
import { useMediaQuery } from 'hooks/useMediaQuery'
import styles from './FreelancerCardInfoItem.module.css'

const listItemStyle = isMobile => ({
  paddingLeft: isMobile ? 12 : undefined,
  paddingRight: isMobile ? 12 : undefined,
  paddingTop: 3,
  paddingBottom: 3,
})

function Icon({ icon, badgeContent, badgeProps = {} }) {
  if (!icon) return null

  if (badgeContent) {
    return (
      <ListItemIcon className={styles.icon}>
        <Badge badgeContent={badgeContent} {...badgeProps}>{icon}</Badge>
      </ListItemIcon>
    )
  }

  return (
    <ListItemIcon className={styles.icon}>
      {icon}
    </ListItemIcon>
  )
}

export interface IFreelancerCardInfoItemProps extends Partial<ListItemProps> {
  icon: React.ReactNode
  primary?: React.ReactNode
  secondary?: React.ReactNode
  badgeContent?: React.ReactNode
  badgeProps?: BadgeProps
  children?: any
  'data-cy'?: string
}

class FreelancerCardInfoItem extends React.PureComponent<IFreelancerCardInfoItemProps & { isMobile: boolean }, {}> {
  render() {
    const { icon, primary, secondary, badgeContent, badgeProps, children, isMobile, style = {}, button, onClick, ...props } = this.props

    return (
      <List disablePadding style={{ maxWidth: '100%', minWidth: 96 }}>
        <ListItem
          style={{ ...listItemStyle(isMobile), ...style }}
          button={button}
          onClick={onClick}
          {...props as any}
        >
          <Icon icon={icon} badgeContent={badgeContent} badgeProps={badgeProps as any} />

          {(primary || secondary) && (
            <ListItemText
              primary={secondary && (
                <span className={styles.secondary}>
                  {secondary}
                  {(button || onClick) && (
                    <ArrowDropDown
                      style={{ verticalAlign: 'middle', margin: '-18px 0', color: '#017EFF' }}
                    />
                  )}
                </span>
              )}
              secondary={primary && (
                <span className={styles.primary}>
                  {primary}
                </span>
              )}
              style={{ padding: 0 }}
            />
          )}

          {children}
        </ListItem>
      </List>
    )
  }
}

export default function FreelancerCardInfoItemWrapper(baseProps: IFreelancerCardInfoItemProps) {
  const isMobile = useMediaQuery('(max-width:800px)')

  return (
    <FreelancerCardInfoItem
      isMobile={isMobile}
      {...baseProps as any}
    />
  )
}
