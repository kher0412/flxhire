import React from 'react'
import { Button } from 'components/themed'
import { isProduction } from 'services/environment'
import { masqAsUser } from 'services/masq'
import { trackError } from 'services/analytics'

class MasqButton extends React.PureComponent<{ record?: any }> {
  masq = async () => {
    const { record } = this.props
    try {
      await masqAsUser({
        id: record?.id,
        email: record?.email,
        slug: record?.profile?.slug,
      })
    } catch (error) {
      trackError(error)
    }
  }

  render() {
    const { record } = this.props
    const hasEverything = record?.id || record?.email || record?.profile?.slug
    if (!isProduction() && hasEverything) {
      return (
        <Button onClick={this.masq}>
          MASQ
        </Button>
      )
    }
    return ''
  }
}

export default MasqButton
