import { Card, CardContent } from '@material-ui/core'
import FiltersPanel, { IFiltersPanelProps } from './FiltersPanel'

interface ISidebarProps extends IFiltersPanelProps {
  drawer: boolean
}

export default function Sidebar({ drawer, ...otherProps }: ISidebarProps) {
  if (drawer) {
    return (
      <div style={{ padding: 12 }}>
        <FiltersPanel {...otherProps} />
      </div>
    )
  }

  return (
    <Card style={{ margin: '0 32px', overflow: 'visible' }}>
      <CardContent>
        <FiltersPanel {...otherProps} />
      </CardContent>
    </Card>
  )
}
