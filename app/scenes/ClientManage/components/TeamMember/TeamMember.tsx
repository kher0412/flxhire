import React, { useMemo } from 'react'
import { Tooltip, Grid, Card } from '@material-ui/core'
import {
  FreelancerCard,
  FreelancerCardHeader,
  FreelancerCardActions,
  FreelancerCardInfoItems,
  FreelancerCardInfoItem,
  FreelancerRates,
  FreelancerCardTags,
  FreelancerCardLocationInfo,
  FreelancerCardIndustryInfo,
} from 'components'
import { Button } from 'components/themed'
import { ITag } from 'types'
import { graphql, useFragment } from 'react-relay'
import { formatAsDate } from 'services/formatting'
import { TeamMember_Contract$key } from '__generated__/TeamMember_Contract.graphql'
import { TeamMember_UpdateContractMutation, UpdateContractInput } from '__generated__/TeamMember_UpdateContractMutation.graphql'
import { useSnackbar, useQuickCommit } from 'hooks'
import { AccountBalance, AttachMoney, CalendarToday, Mail, Person } from '@material-ui/icons'
import EnablePaymentsButton from './components/EnablePaymentsButton'
import TeamMemberActions from './components/TeamMemberActions'
import CardHeaderAction from './components/CardHeaderAction/CardHeaderAction'
import TeamMemberRole from './components/TeamMemberRole'

interface ITeamMemberProps {
  contract: TeamMember_Contract$key
  toggleSelection: (id: number) => void
  selected: boolean
}

const useTeamMemberContainer = (contractProp: TeamMember_Contract$key) => {
  const showSnackbar = useSnackbar()

  const contract = useFragment(graphql`
    fragment TeamMember_Contract on Contract {
      id
      rawId
      paymentsEnabled
      enableTimesheets
      freelancerEmail
      startDate
      endDate
      nextSalaryInvoiceDate
      isManager
      status
      client {
        name
        firm {
          tags {
            rawId
            name
          }
        }
      }
      tags {
        rawId
        name
      }
      ...FreelancerCardHeader_Contract
      ...FreelancerCardChatButton_Contract
      ...FeedbackButton_Contract
      ...FreelancerComment_Contract
      ...FreelancerCardContact_Contract
      ...FreelancerRates_Contract
      ...FreelancerInterviewTimes_Contract
      ...FreelancerCardJob_Contract
      ...TeamMemberActions_Contract
      ...TeamMemberRole_Contract

      freelancer {
        ...FreelancerCardHeader_Freelancer
        ...FreelancerCardIndustryInfo_Freelancer
        ...FreelancerCardChatButton_Freelancer
        ...FeedbackButton_Freelancer
        ...FreelancerComment_Freelancer
        ...FreelancerCardLocationInfo_Freelancer
        ...FreelancerRates_Freelancer
        ...ShareLinkButton_Freelancer
        ...FreelancerInterviewTimes_Freelancer
        ...FreelancerCardSkillsInfo_Freelancer
      }
    }
  `, contractProp)

  const { execute: commitUpdateContract, loading: updatingContract } = useQuickCommit<TeamMember_UpdateContractMutation>(graphql`
    mutation TeamMember_UpdateContractMutation($input: UpdateContractInput!) {
      updateContract(input: $input) {
        contract {
          status
          deletable
          lastInteractionAt
          startDate
          endDate
          tags {
            name
          }
          client {
            firm {
              tags {
                rawId
                name
              }
            }
          }
        }
      }
    }
  `)

  const updateContract = async (input: Omit<UpdateContractInput, 'contractId'>, feedbackMessage: string = 'Contract updated') => {
    const result = await commitUpdateContract({
      input: {
        contractId: contract?.id,
        ...input,
      },
    })

    if (result) showSnackbar(feedbackMessage)
  }

  const setTags = (newTags: ITag[]) => updateContract({ tags: newTags.map(t => t.name) })
  const resumeContract = () => updateContract({ status: 'active' }, 'Contract resumed')
  const pauseContract = () => updateContract({ status: 'paused' }, 'Contract paused')

  return {
    contract,
    updatingContract,
    setTags,
    resumeContract,
    pauseContract,
  }
}

const TeamMember = (props: ITeamMemberProps) => {
  const { selected, contract: contractProp } = props
  const { contract, updatingContract, setTags, resumeContract, pauseContract } = useTeamMemberContainer(contractProp)

  if (!contract) return null

  const freelancer = contract?.freelancer
  const tags = contract?.client?.firm?.tags?.map(t => ({ id: t.rawId, name: t.name })) || []

  const toggleSelection = useMemo(() => {
    if (contract?.isManager) return null
    return () => props.toggleSelection(contract.rawId)
  }, [contract?.isManager])

  return (
    <Card variant="outlined" elevation={0}>
      <FreelancerCard
        flat
        disabled={updatingContract || contract?.status === 'deleted'}
        action={(
          <CardHeaderAction
            toggleSelection={toggleSelection}
            selected={selected && contract?.status !== 'deleted'}
            disabled={updatingContract || contract?.status === 'deleted'}
          />
        )}
      >
        <FreelancerCardHeader
          freelancer={freelancer}
          contract={contract}
          showStatus
          statusAdditionalText={contract.paymentsEnabled || !contract.enableTimesheets ? '' : ' (work report tracking only)'}
        >
          {contract.freelancerEmail && (
            <Tooltip title={contract.freelancerEmail}>
              <Button iconOnly href={`mailto:${contract.freelancerEmail}`}>
                <Mail />
              </Button>
            </Tooltip>
          )}
        </FreelancerCardHeader>

        <FreelancerCardInfoItems>
          <Grid container>
            <Grid item xs={6} sm={4}>
              <FreelancerCardIndustryInfo
                freelancer={freelancer}
              />

              <FreelancerCardLocationInfo
                freelancer={freelancer}
              />

              <FreelancerCardInfoItem
                icon={<AccountBalance />}
                primary={contract.nextSalaryInvoiceDate ? formatAsDate(contract.nextSalaryInvoiceDate) : 'n/a'}
                secondary="Next paycheck"
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              {contract.paymentsEnabled && (
                <FreelancerRates contract={contract} freelancer={freelancer} />
              )}

              {!contract.paymentsEnabled && (
                <FreelancerCardInfoItem
                  icon={<AttachMoney />}
                  primary="n/a"
                  secondary="Compensation"
                />
              )}

              <FreelancerCardInfoItem
                icon={<CalendarToday />}
                primary={formatAsDate(contract.startDate) || 'n/a'}
                secondary="Contract start"
              />

              <FreelancerCardInfoItem
                icon={<CalendarToday />}
                primary={formatAsDate(contract.endDate) || 'n/a'}
                secondary="Contract end"
              />
            </Grid>

            <Grid item xs={6} sm={4}>
              <TeamMemberRole
                contractFragmentRef={contract}
              />

              <FreelancerCardInfoItem
                icon={<Person />}
                primary={contract?.client?.name || 'n/a'}
                data-cy="team-member-manager"
                secondary={contract?.isManager ? 'Invoice Recipient' : 'Manager'}
              />
            </Grid>
          </Grid>
        </FreelancerCardInfoItems>

        <FreelancerCardActions>
          <FreelancerCardTags
            tags={contract?.tags?.map(t => ({ id: t.rawId, name: t.name }))}
            setTags={setTags}
            availableTags={tags}
          />

          <EnablePaymentsButton contract={contract} />

          <TeamMemberActions
            contract={contract}
            pauseContract={pauseContract}
            resumeContract={resumeContract}
          />
        </FreelancerCardActions>
      </FreelancerCard>
    </Card>
  )
}

export default TeamMember
