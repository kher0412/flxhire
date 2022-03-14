import { PureComponent, Fragment } from 'react'
import { browserHistory, extractQueryParams } from 'services/router'
import { get } from 'lodash'
import {
  Card,
  CardContent,
  List,
  CardActions,
  Collapse,
} from '@material-ui/core'
import { Button } from 'components/themed'
import { IContractForFreelancer, ICurrentUser } from 'types'
import JobApplication from './JobApplication'
import DeleteDialog from './DeleteDialog'
import styles from './JobApplications.module.css'
import { ContainerProps } from './JobApplicationsContainer'

interface IJobApplicationsProps extends ContainerProps {
  contracts: IContractForFreelancer[]
  user: ICurrentUser
  acceptRequests: () => Promise<void>
  deleteContract: (id: number) => Promise<void>
  getContracts: () => Promise<void>
}

interface IJobApplicationsState {
  expanded: boolean
  deleteDialogOpen: boolean
  contractId: number
}

class JobApplications extends PureComponent<IJobApplicationsProps, IJobApplicationsState> {
  state = {
    expanded: false,
    deleteDialogOpen: false,
    contractId: null,
  }

  componentDidMount() {
    this.refresh()
  }

  refresh = () => this.props.getContracts()

  render() {
    const { contracts = [] } = this.props
    const { expanded } = this.state

    if (contracts.length < 1) return null
    let contractsAbove = contracts.slice(0, 3)
    let contractsBelow = []
    const hasContractsBelow = contracts.length > 3
    if (hasContractsBelow) {
      contractsBelow = contracts.slice(3)
    }

    return (
      <Card raised style={{ marginTop: 24 }}>
        <CardContent>
          <List disablePadding>
            {this.renderJobApplications(contractsAbove)}
          </List>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {this.renderJobApplications(contractsBelow)}
            </List>
          </Collapse>
        </CardContent>

        {hasContractsBelow && (
          <CardActions disableSpacing>
            <Button color="secondary" onClick={this.toggleExpand} className={styles.expand}>
              {!expanded && (
                <Fragment>
                  Show all ({contractsBelow.length + contractsAbove.length})
                </Fragment>
              )}

              {expanded && (
                <Fragment>
                  Hide
                </Fragment>
              )}
            </Button>
          </CardActions>
        )}

        {this.renderDeleteDialog()}
      </Card>
    )
  }

  renderDeleteDialog() {
    const { contracts = [] } = this.props
    const { contractId, deleteDialogOpen } = this.state
    const contract = contracts.find(x => x.id === contractId)
    if (!deleteDialogOpen || !contract) return null

    return (
      <DeleteDialog
        open={deleteDialogOpen}
        contract={contract}
        onClose={this.closeDeleteDialog}
        onDelete={this.deleteContract}
      />
    )
  }

  renderJobApplications = (contracts) => {
    const { user } = this.props
    return contracts.map((contract, i) => (
      <JobApplication
        key={contract.id}
        contract={contract}
        user={user}
        openDeleteDialog={this.openDeleteDialog}
        data-cy={`job-application-${i}`}
      />
    ))
  }

  openJob = contract => () => {
    browserHistory.push('/[...slugs]', `/${get(contract, 'job.firm_slug')}/${get(contract, 'job.slug')}?applying=true`)
  }

  getJobTitle(contract) {
    const jobTitle = get(contract, 'job.title', 'Unknown Job')

    if (jobTitle && jobTitle.length > 30) {
      return `${jobTitle.substring(0, 29)}...`
    }

    return jobTitle
  }

  toggleExpand = () => this.setState(state => ({ expanded: !state.expanded }))

  openDeleteDialog = (contractId) => {
    const { deleteContract, contracts = [] } = this.props
    const contract = contracts.find(c => c.id === contractId)
    if (!contract) return
    // Drafts don't need confirmation
    if (contract.status === 'job_application_draft') {
      deleteContract(contractId)
    } else {
      this.setState({
        deleteDialogOpen: true,
        contractId,
      })
    }
  }

  closeDeleteDialog = () => this.setState({ deleteDialogOpen: false })

  deleteContract = () => {
    this.props.deleteContract(this.state.contractId)
    this.setState({ deleteDialogOpen: false, contractId: null })
  }
}

export default JobApplications
