import { memo, CSSProperties } from 'react'
import { IconButton, Zoom } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const CloseDialogButton = memo(({ onClick, style }: { onClick: () => void, style?: CSSProperties }) => (
  <Zoom in={typeof onClick === 'function'} unmountOnExit>
    <IconButton size="small" style={style} onClick={onClick}>
      <Close />
    </IconButton>
  </Zoom>
))

export default CloseDialogButton
