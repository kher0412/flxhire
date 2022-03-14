import React from 'react'
import { PagePlaceholder } from 'components'

const NoTimesheets = () => (
  <PagePlaceholder
    raised
    title="No work reports yet."
    subtitle={(
      <span>
        Add one by clicking the `New Work Report` button above.
      </span>
    )}
  />
)

export default NoTimesheets
