import React from 'react'
import { LinearProgress } from '@material-ui/core'
import { classList } from 'services/styles'
import styles from './LoadingOverlay.module.css'

const LoadingOverlay = ({ show }: { show?: boolean }) => {
  React.useEffect(() => {
    // set 'progress' cursor on body (default cursor + spinner next to it)
    // this will also apply the 'progress' cursor on all elements which don't specify their own cursor (links, buttons, etc)
    // as a result, we get a nice indication of loading progress without having to block the entire app
    document.body.style.cursor = show ? 'progress' : ''
  }, [show])

  return (
    <div className={classList(styles.container, show ? undefined : styles.hidden)} data-cy={show ? 'loading-overlay' : undefined}>
      <LinearProgress />
    </div>
  )
}

export default React.memo(LoadingOverlay)
