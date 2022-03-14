import { memo, ComponentProps } from 'react'
import { Avatar, Badge } from '@material-ui/core'
import { Picture } from 'components'
import Link from 'components/Link'
import styles from './UserAvatar.module.css'

interface IUserAvatarProps extends ComponentProps<typeof Avatar> {
  name?: string
  url?: string
  href?: string
  as?: string
  width?: number
  badgeContent?: any
  badgeProps?: any
  dotProps?: any
  dotColor?: any
  icon?: any
}

const UserAvatar = memo((props: IUserAvatarProps) => {
  const { name, url, href = '', as = '', width = 100, icon, badgeContent, badgeProps = {}, dotProps = {}, dotColor, ...otherProps } = props
  let element
  if (url) {
    element = (
      <Avatar {...otherProps}>
        <Picture filestack width={width} src={url} style={{ width: '100%' }} />
      </Avatar>
    )
  } else if (icon) {
    element = (
      <Avatar {...otherProps}>
        {icon}
      </Avatar>
    )
  } else if (typeof name === 'string' && name.length > 0) {
    element = (
      <Avatar {...otherProps}>
        {name[0].toUpperCase()}
      </Avatar>
    )
  } else {
    element = (
      <Avatar {...otherProps}>
        <Picture
          src={require('assets/images/no_avatar.png?webp')}
          srcFallback={require('assets/images/no_avatar.png')}
          style={{ width: '100%' }}
        />
      </Avatar>
    )
  }
  if (dotColor) {
    element = (
      <Badge
        variant="dot"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        overlap="circle"
        color={dotColor}
        className={styles.badge}
        {...dotProps}
      >
        {element}
      </Badge>
    )
  }
  if (badgeContent) {
    element = (
      <Badge
        badgeContent={badgeContent}
        overlap="circle"
        className={styles.badge}
        {...badgeProps}
      >
        {element}
      </Badge>
    )
  }
  if (href) {
    return <Link href={href} as={as} style={{ textDecoration: 'none' }}>{element}</Link>
  }
  return element
})

export default UserAvatar
