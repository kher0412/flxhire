import React from 'react'
import { mount } from '@cypress/react'
import { ComponentTestEnvironment } from 'components/testing'
import Timesheet from './Timesheet'
import TimesheetFormWrapper from './components/TimesheetFormWrapper'

xit('Displays contract daily rate correctly', () => {
  // TODO: needs redux set up or refactoring the component
  // to not need redux
  mount(
    <ComponentTestEnvironment>
      <TimesheetFormWrapper timesheet={{}}>
        <Timesheet
          disableCardBorders
          clientId={1}
          contracts={[{
            client: {
              id: 1,
              name: 'Manager',
            },
            freelancer_rate: 800,
            rate_mode: 'day',
          }]}
        />
      </TimesheetFormWrapper>
    </ComponentTestEnvironment>,
  )

  cy.get('button').contains('Test button').click()
})
