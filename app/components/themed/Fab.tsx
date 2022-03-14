import { Fab as MuiFab, Zoom } from '@material-ui/core'
import { ComponentProps, CSSProperties } from 'react'

interface IFabProps extends ComponentProps<typeof MuiFab> {
  transitionDelay?: number
}

const Fab = ({ children, transitionDelay, ...props }: IFabProps) => {
  const transitionStyle: CSSProperties = {}
  if (transitionDelay) transitionStyle.transitionDelay = `${transitionDelay}ms`
  return (
    <Zoom in style={transitionStyle}>
      <MuiFab {...props}>{children}</MuiFab>
    </Zoom>
  )
}

export default Fab
