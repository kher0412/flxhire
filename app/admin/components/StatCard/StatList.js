import React from 'react'
import PropTypes from 'prop-types'
import {
  ListItem, ListItemText, List,
} from '@material-ui/core'
import { get } from 'lodash'

const renderContent = (stat) => {
  if (typeof stat === 'object') {
    const keys = Object.keys(stat)
    return (
      <List>
        {keys.map(k => (
          <ListItem key={k}>
            <ListItemText
              primary={get(stat[k], 'data', stat[k])}
              secondary={k}
            />
          </ListItem>
        ))}
      </List>
    )
  }
  return null
}

const StatList = ({
  source, record = {},
}) => {
  const stat = source ? get(record, source, '(Missing)') : record
  return renderContent(stat)
}

StatList.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
}

export default StatList
