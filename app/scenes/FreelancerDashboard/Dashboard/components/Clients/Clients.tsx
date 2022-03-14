import React from 'react'
import { Card } from '@material-ui/core'
import styles from './Clients.module.css'
import Client from './components/Client'
import { ContainerProps } from './ClientsContainer'

class Clients extends React.PureComponent<ContainerProps> {
  render() {
    const { runningContracts } = this.props

    if (runningContracts.length === 0) {
      return this.renderPlaceholder()
    }

    return (
      <div data-cy="contracts-container">
        {runningContracts.map(contract => this.renderContractItem(contract))}
      </div>
    )
  }

  renderContractItem(contract) {
    return (
      <Client
        key={contract.id}
        contract={contract}
      />
    )
  }

  renderPlaceholder() {
    return (
      <Card className={styles['placeholder-container']} raised>
        <div className={styles.placeholder}>
          No clients at the moment
        </div>
      </Card>
    )
  }
}

export default Clients
