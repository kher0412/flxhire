import React from 'react'
import { Collapse, Grid, GridProps } from '@material-ui/core'

export interface IGridExpandableProps extends GridProps {
  expand: boolean
  appear?: boolean
  mountOnEnter?: boolean
  unmountOnExit?: boolean
}

export interface IGridExpandableState {
}

export default class GridExpandable extends React.Component<IGridExpandableProps, IGridExpandableState> {
  render() {
    let { children, expand, item = true, mountOnEnter = true, unmountOnExit = false, appear, style, ...restProps } = this.props

    return (
      <Grid
        item={item}
        style={this.getStyle(expand, style)}
        {...restProps}
      >
        <Collapse in={expand} appear={appear} mountOnEnter={mountOnEnter} unmountOnExit={unmountOnExit}>
          {children}
        </Collapse>
      </Grid>
    )
  }

  getStyle(expand: boolean, customStyle?: React.CSSProperties) {
    let style: React.CSSProperties = {
      transition: 'padding 0.3s ease',
      paddingTop: expand ? undefined : 0,
      paddingBottom: expand ? undefined : 0,
    }

    if (customStyle) {
      return {
        ...style,
        ...customStyle,
      }
    }

    return style
  }
}
