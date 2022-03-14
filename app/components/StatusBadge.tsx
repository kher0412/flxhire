import React from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

const STYLE = {
  height: 12,
  width: 12,
  marginRight: 6,
  marginBottom: 0,
}

const StatusBadge = ({ text, color }: { text: string, color?: string }) => {
  if (color) {
    return (
      <span data-cy="status-badge" style={{ color }}>
        <FiberManualRecordIcon style={{ ...STYLE, color }} />
        {text}
      </span>
    )
  }

  return <span data-cy="status-badge">{text}</span>
}

export default StatusBadge
