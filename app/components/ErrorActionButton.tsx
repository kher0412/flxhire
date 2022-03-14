import { Refresh } from '@material-ui/icons'
import { Button } from 'components/themed'
import { ComponentProps } from 'react'
import { IAPIError } from 'types'
import Link from './Link'

interface IErrorActionButtonProps extends ComponentProps<typeof Button> {
  retry?: () => void
  error?: IAPIError
}

export default function ErrorActionButton({ error, retry, ...props }: IErrorActionButtonProps) {
  if (error?.name === 'BillingPlanIncompatibleError') {
    return (
      <Button
        color="primary"
        {...props}
        muiComponent={Link}
        href="/account/plans"
      >
        Upgrade Options
      </Button>
    )
  }

  if (error?.name === 'BillingSetupRequiredError') {
    return (
      <Button
        color="primary"
        {...props}
        muiComponent={Link}
        href="/account/plans"
      >
        Complete Setup
      </Button>
    )
  }

  if (retry) {
    return (
      <Button
        color="primary"
        {...props}
        onClick={retry}
      >
        <Refresh /> Retry
      </Button>
    )
  }

  return null
}
