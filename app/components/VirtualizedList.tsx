import { ElementType, CSSProperties, ReactElement } from 'react'
import { List, AutoSizer } from 'react-virtualized'
import 'react-virtualized/styles.css'

interface IRowRendererProps {
  index: number
  key: string
  style: CSSProperties
}

const RowRenderer = (Component: ElementType<IRowRendererProps>) => ({ index, key, style }: IRowRendererProps) => (
  <Component key={key} index={index} style={style} />
)

interface IVirtualizedListProps {
  Component: ElementType
  // How tall each element should be forced to be
  rowHeight: number
  count: number
  noRowsRenderer?: () => ReactElement
  // Total height in pixels that the list should occupy
  height?: number
  // Pass additional props that affect list rendering to make sure it re-renders properly
  [dependencyProp: string]: any
}

const VirtualizedList = ({ Component, rowHeight, count, noRowsRenderer, height: heightProp, ...otherProps }: IVirtualizedListProps) => (
  <AutoSizer disableHeight={Boolean(heightProp)}>
    {({ width, height }) => (
      <List
        width={width}
        height={heightProp || height}
        estimatedRowSize={rowHeight}
        rowHeight={rowHeight}
        rowCount={count}
        rowRenderer={RowRenderer(Component)}
        noRowsRenderer={noRowsRenderer}
        {...otherProps}
      />
    )}
  </AutoSizer>
)

export default VirtualizedList
