import { memo, ComponentProps } from 'react'
import { Avatar } from '@material-ui/core'
import { Picture } from 'components'

interface ICompanyAvatarProps extends ComponentProps<typeof Avatar> {
  url?: string
  width?: number
}

const CompanyAvatar = memo(({ url, width, ...otherProps }: ICompanyAvatarProps) => (
  url ? (
    <Avatar {...otherProps}>
      <Picture filestack width={width} src={url} style={{ width: '100%' }} />
    </Avatar>
  ) : null
))

export default CompanyAvatar
