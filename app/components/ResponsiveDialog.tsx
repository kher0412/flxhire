import React from 'react'
import { Dialog, Slide, DialogProps } from '@material-ui/core'
import { useMediaQuery } from 'hooks/useMediaQuery'

const dialogTransition = props => (<Slide direction="up" {...props} />)

const tallPaperStyle = {
  height: '800px',
}

export interface IResponsiveDialogProps extends DialogProps {
  maxFullscreenWidth?: string
  fullWidth?: boolean
  tall?: boolean
  children?: any
  open: boolean
}

export default function ResponsiveDialog(props: IResponsiveDialogProps) {
  const { children, maxFullscreenWidth = '750px', fullWidth = false, open, scroll, tall, ...restProps } = props
  const fullScreen = useMediaQuery(`(max-width:${maxFullscreenWidth})`)
  const paperProps = tall && !fullScreen ? { ...restProps.PaperProps, style: { ...restProps?.PaperProps?.style, ...tallPaperStyle } } : props.PaperProps

  return (
    <Dialog
      open={open}
      fullScreen={fullScreen}
      TransitionComponent={!fullScreen || props.TransitionComponent ? props.TransitionComponent : dialogTransition}
      scroll={scroll || 'body'}
      PaperProps={paperProps}
      {...restProps}
    >
      {fullWidth && (
        // spanner
        <div style={{ width: 9999 }} />
      )}

      {children}
    </Dialog>
  )
}
