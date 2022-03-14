import { connect, ConnectedProps } from 'react-redux'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import ExistingCodeTestsBrowser from './ExistingCodeTestsBrowser'

const mapDispatchToProps = (dispatch) => {
  return {
    getCodeTests: async (params = {}) => {
      try {
        return await getAPIClient().getProjects(params)
      } catch (err) {
        trackError(err)
        console.error(err)
        return []
      }
    },
  }
}

const connector = connect(null, mapDispatchToProps)

export type ExistingCodeTestsBrowserContainerProps = ConnectedProps<typeof connector>

export default connector(ExistingCodeTestsBrowser)
