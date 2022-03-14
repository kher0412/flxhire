import { ErrorActionButton, PagePlaceholder, LoadingIcon } from 'components'
import { getErrorDescription, getErrorTitle } from 'services/error'
import { IAPIError } from 'types'
import { ComponentProps } from 'react'

interface ISuspensePlaceholderProps extends ComponentProps<typeof PagePlaceholder>{
  error?: IAPIError
}

const SuspensePlaceholder = ({ error, ...props }: ISuspensePlaceholderProps) => {
  // TODO: remove the 'raised' being set to true by default
  if (error) {
    return (
      <PagePlaceholder
        title={getErrorTitle(error)}
        subtitle={getErrorDescription(error)}
        action={<ErrorActionButton error={error} />}
        raised
        {...props}
      />
    )
  }

  return (
    <PagePlaceholder
      icon={(<LoadingIcon />)}
      title="Hold on..."
      subtitle="Loading all the data..."
      name="page-placeholder-loading"
      raised
      {...props}
    />
  )
}

export default SuspensePlaceholder
