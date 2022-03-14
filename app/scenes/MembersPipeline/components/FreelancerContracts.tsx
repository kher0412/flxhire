import { IContractStatus } from 'types'
import moment from 'moment'
import React from 'react'
import { useQuickCommit } from 'hooks'
import { browserHistory, buildQueryParams } from 'services/router'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core'
import { getStatus, getHireTabForContract } from 'services/contract'
import { MoreButtonMenu } from 'components'
import { graphql, useFragment } from 'react-relay'
import { FreelancerContracts_Contracts$key, FreelancerContracts_Contracts } from '__generated__/FreelancerContracts_Contracts.graphql'
import { FreelancerContracts_UpdateContractMutation } from '__generated__/FreelancerContracts_UpdateContractMutation.graphql'
import { MoreVert, OpenInNew } from '@material-ui/icons'

type Contract = FreelancerContracts_Contracts['freelancerContracts']['edges'][number]['node']

interface IFreelancerContractsProps {
  freelancer: FreelancerContracts_Contracts$key
}

const FreelancerContracts = ({ freelancer: freelancerProp }: IFreelancerContractsProps) => {
  const freelancer = useFragment(graphql`
    fragment FreelancerContracts_Contracts on User {
      hidden
      profile {
        slug
      }
      freelancerContracts(first: 5) {
        edges {
          node {
            rawId
            id
            hidden
            lastInteractionAt
            status
            previousStatus
            requestsStatus
            applicantSource
            jobApplicationReminderSentAt
            profileJobIncompatibilityReasons
            contractRequests {
              id
            }
            job {
              slug
              title
            }
            client {
              firm {
                name
                slug
              }
            }
            referer {
              name
            }
          }
        }
      }
    }
  `, freelancerProp)

  const { execute: commitUpdateContract } = useQuickCommit<FreelancerContracts_UpdateContractMutation>(graphql`
    mutation FreelancerContracts_UpdateContractMutation($input: UpdateContractInput!) {
      updateContract(input: $input) {
        contract {
          hidden
        }
      }
    }
  `)

  const openContractInHirePipeline = (contract: Contract) => {
    const tab = getHireTabForContract({
      status: contract.status as IContractStatus,
      contract_requests: contract.contractRequests,
    })
    const focus = freelancer?.profile?.slug
    if (tab && focus) {
      const company = contract.client?.firm?.slug
      const params = { job: contract.job?.slug, focus, tab, company }
      browserHistory.push('/client/hire', `/client/hire?${buildQueryParams(params)}`)
      return true
    }
    return false
  }

  const openContractInAdminConsole = (contract: Contract) => {
    browserHistory.push('/admin', `/admin#contracts/${contract.rawId}`)
  }
  const openContract = (contract: Contract) => {
    if (!openContractInHirePipeline(contract)) openContractInAdminConsole(contract)
  }

  const getContractDescription = (contract: Contract) => {
    const status = getStatus(contract?.status as IContractStatus, contract?.requestsStatus) || contract?.status || 'Unknown Status'
    const previousStatus = getStatus(contract?.previousStatus as IContractStatus) || contract?.previousStatus as IContractStatus
    const lastUpdatedRaw = contract?.lastInteractionAt
    const lastUpdated = lastUpdatedRaw ? moment(lastUpdatedRaw).fromNow() : 'never'
    const freelancerVisibility = freelancer?.hidden ? 'Freelancer is HIDDEN' : 'Visible'
    const visibility = contract.hidden ? 'Contract is HIDDEN' : freelancerVisibility
    const reminderSentAt = contract?.jobApplicationReminderSentAt ? moment(contract.jobApplicationReminderSentAt).fromNow() : 'never'
    const refererWebsite = contract?.applicantSource || 'N/A'
    const refererUser = contract?.referer?.name || 'N/A'
    const profileIncompatibilityReasons = contract?.profileJobIncompatibilityReasons?.join(', ') || 'None'
    return [
      `${status}${previousStatus ? ` (previously ${previousStatus})` : ''}`,
      `Last Updated ${lastUpdated}`,
      `Reminder Sent ${reminderSentAt}`,
      `Applicant Visibility: ${visibility}`,
      `Profile Incompat.: ${profileIncompatibilityReasons}`,
      `Source: ${refererWebsite}`,
      `Referer: ${refererUser}`,
    ].join(' | ')
  }

  const toggleContractVisibility = async (contract: Contract) => {
    await commitUpdateContract({
      input: {
        contractId: contract.id,
        hidden: !contract?.hidden,
      },
    })
  }

  return (
    <List style={{ order: 5 }}>
      {freelancer?.freelancerContracts?.edges?.map(({ node: contract }: { node: Contract }) => (
        <ListItem button key={contract.id} onClick={() => openContract(contract)}>
          <ListItemText
            primary={`${contract?.job?.title || '(No Job Specified)'} @ ${contract?.client?.firm?.name}`}
            secondary={getContractDescription(contract)}
          />
          <ListItemSecondaryAction>
            <MoreButtonMenu icon={<MoreVert />}>
              <MenuItem onClick={() => toggleContractVisibility(contract)}>
                <ListItemText
                  primary="Toggle Visibility"
                  secondary="Toggle visibility of this job application in the customer's Hire Pipeline"
                />
              </MenuItem>
              <MenuItem onClick={() => openContractInHirePipeline(contract)}>
                <ListItemIcon><OpenInNew /></ListItemIcon>
                <ListItemText
                  primary="Open Contract in Hire Pipeline"
                />
              </MenuItem>
              <MenuItem onClick={() => openContractInAdminConsole(contract)}>
                <ListItemIcon><OpenInNew /></ListItemIcon>
                <ListItemText
                  primary="Open Contract in Admin Console"
                />
              </MenuItem>
            </MoreButtonMenu>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  )
}

export default FreelancerContracts
