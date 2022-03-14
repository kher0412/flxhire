import React from 'react'
import { PagePlaceholder } from 'components'

const NoClients = () => (
  <PagePlaceholder
    raised
    title="No reports yet."
    subtitle={(
      <span>
        You need to have a contract going before you can create a Work Report.
      </span>
    )}
  />
)

export default NoClients
