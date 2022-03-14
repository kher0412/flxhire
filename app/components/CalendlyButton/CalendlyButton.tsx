import { useCurrentUser } from 'hooks'
import { ComponentProps, useCallback, useEffect } from 'react'
import { openPopupWidget } from 'react-calendly'
import { isProduction } from 'services/environment'
import { ICurrentUser } from 'types'
import Button from '../themed/Button'

type CalendlyOptions = Parameters<typeof openPopupWidget>[0]

export function getCalendlyOptions(user: ICurrentUser): Omit<CalendlyOptions, 'url'> {
  // TODO customize options
  return {
    prefill: {
      name: user.name,
      firstName: user.first_name,
      lastName: user.last_name,
      // IMPORTANT: people will get real emails from calendly if we pass their real email here.
      email: isProduction() ? user.email : 'calendlytests@flexhire.com',
    },
  }
}

interface ICalendlyButtonProps extends ComponentProps<typeof Button> {
  url: string
  onSuccess: (event: any) => void
}

const CalendlyButton = ({ url, onSuccess, ...otherProps }: ICalendlyButtonProps) => {
  useEffect(() => {
    // Capture calendly events
    const listener = (e) => {
      if (e?.data?.event?.indexOf('calendly') === 0) {
        const name = e.data.event
        console.log('CalendlyEvent', name)
        if (name === 'calendly.event_scheduled') {
          console.log('Event Scheduled', e)
          if (typeof onSuccess === 'function') onSuccess(e)
        }
      }
    }
    window.addEventListener('message', listener)
    return () => window.removeEventListener('message', listener)
  })
  const [user] = useCurrentUser()

  const onClick = useCallback(() => openPopupWidget({ url, ...getCalendlyOptions(user) }), [url])

  if (!url) return null

  return (
    <Button color="primary" {...otherProps} onClick={onClick}>
      Book a Meeting on Calendly
    </Button>
  )
}

export default CalendlyButton
