import React, { memo } from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import FlexHireTheme from 'FlexHireTheme'
import MomentUtils from '@date-io/moment'
import { Environment, RelayEnvironmentProvider } from 'react-relay'

interface IComponentEnvironmentProps {
  children: any,
  relayEnvironment?: Environment
  withSuspense?: boolean
}

const ComponentEnvironment = memo(({ children, relayEnvironment = null }: IComponentEnvironmentProps) => {
  let content = children

  content = (
    <ThemeProvider theme={FlexHireTheme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>{content}</MuiPickersUtilsProvider>
    </ThemeProvider>
  )

  if (relayEnvironment) {
    content = (
      <RelayEnvironmentProvider environment={relayEnvironment}>
        {content}
      </RelayEnvironmentProvider>
    )
  }

  return content
})

export default ComponentEnvironment
