import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader } from '@material-ui/core'
import { get } from 'lodash'

const cardStyle = {
  width: 300,
  margin: '0.5em',
  display: 'inline-block',
  verticalAlign: 'top',
}

export const StatCard = ({ label, source, record = {} }) => (
  <Card style={cardStyle}>
    <CardHeader
      primary={label}
      subheader={get(record, source)}
    />
  </Card>
)

StatCard.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
}

export default StatCard
