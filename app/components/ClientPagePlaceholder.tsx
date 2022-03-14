import { ComponentProps } from 'react'
import { SuspensePlaceholder } from 'components'

const ClientPagePlaceholder = (props: ComponentProps<typeof SuspensePlaceholder>) => {
  return (
    <SuspensePlaceholder raised={false} flat {...props} />
  )
}

export default ClientPagePlaceholder
