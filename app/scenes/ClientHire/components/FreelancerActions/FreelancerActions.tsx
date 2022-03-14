import React, { CSSProperties } from 'react'
import MediaQuery from 'components/MediaQuery'
import { MoreButtonCard, Suspense } from 'components'
import { Button } from 'components/themed'
import { graphql, useFragment } from 'react-relay'
import { FreelancerActions_Freelancer$key } from '__generated__/FreelancerActions_Freelancer.graphql'
import { FreelancerActions_Contract$key } from '__generated__/FreelancerActions_Contract.graphql'
import { FreelancerActions_Job$key } from '__generated__/FreelancerActions_Job.graphql'
import { HowToReg } from '@material-ui/icons'
import styles from './FreelancerActions.module.css'
import AddToCalendarButton from './components/AddToCalendarButton'
import AdminButton from './components/AdminButton'
import DeleteButton from './components/DeleteButton'
import RejectButton from './components/RejectButton'
import RequestInterviewButton from './components/RequestInterviewButton'
import MakeOfferButton from './components/MakeOfferButton'
import ContractRequestsButton from './components/ContractRequestsButton'
import InviteToApplyButton from './components/InviteToApplyButton'
import ResendButton from './components/ResendButton'

interface IFreelancerActionsProps {
  freelancer: FreelancerActions_Freelancer$key
  contract: FreelancerActions_Contract$key
  job: FreelancerActions_Job$key
  adminMode?: boolean
  autoOpenAction?: string
  connectionId?: string
  style?: CSSProperties
}

const FreelancerActions = (props: IFreelancerActionsProps) => {
  const { style, contract: contractProp, freelancer: freelancerProp, job: jobProp, autoOpenAction, adminMode, connectionId } = props
  const contract = useFragment(graphql`
      fragment FreelancerActions_Contract on Contract {
        rawId
        ...AddToCalendarButton_Contract
        ...AdminButton_Contract
        ...DeleteButton_Contract
        ...RejectButton_Contract
        ...RequestInterviewButton_Contract
        ...MakeOfferButton_Contract
        ...InviteToApplyButton_Contract
        ...ResendButton_Contract
      }
    `, contractProp)
  const freelancer = useFragment(graphql`
      fragment FreelancerActions_Freelancer on User {
        rawId
        ...AddToCalendarButton_Freelancer
        ...AdminButton_Freelancer
        ...RejectButton_Freelancer
        ...RequestInterviewButton_Freelancer
        ...MakeOfferButton_Freelancer
        ...InviteToApplyButton_Freelancer
      }
    `, freelancerProp)
  const job = useFragment(graphql`
    fragment FreelancerActions_Job on Job {
      ...AdminButton_Job
      ...InviteToApplyButton_Job
      ...RequestInterviewButton_Job
      ...MakeOfferButton_Job
      ...RejectButton_Job
    }
  `, jobProp)

  return (
    <React.Fragment>
      <MediaQuery maxWidth={1599}>
        {isMobile => isMobile ? (
          <MoreButtonCard
            component={Button}
            style={style}
            className={styles.button}
            color="primary"
            mobileDialogCloseLabel="Cancel"
            buttonChildren={(
              <React.Fragment>
                <HowToReg /> Take Action
              </React.Fragment>
              )}
            data-cy="take-action"
          >
            <div className={styles.actionsDropdown}>
              <div>
                <AddToCalendarButton
                  freelancer={freelancer}
                  contract={contract}
                />
              </div>
              {adminMode && (
                <div>
                  <AdminButton
                    freelancer={freelancer}
                    contract={contract}
                    job={job}
                  />
                </div>
              )}
              <div>
                <DeleteButton
                  contract={contract}
                  connectionId={connectionId}
                />
              </div>
              <div>
                <RejectButton
                  freelancer={freelancer}
                  contract={contract}
                  job={job}
                  connectionId={connectionId}
                />
              </div>
              <div>
                <Suspense>
                  <ContractRequestsButton
                    freelancerId={freelancer?.rawId as number}
                    contractId={contract?.rawId as number}
                    autoOpenAction={autoOpenAction}
                    connectionId={connectionId}
                  />
                </Suspense>
              </div>
              <div>
                <RequestInterviewButton
                  freelancer={freelancer}
                  contract={contract}
                  job={job}
                  autoOpenAction={autoOpenAction}
                  connectionId={connectionId}
                />
              </div>
              <div>
                <MakeOfferButton
                  freelancer={freelancer}
                  contract={contract}
                  job={job}
                  autoOpenAction={autoOpenAction}
                />
              </div>
              <div>
                <InviteToApplyButton
                  freelancer={freelancer}
                  contract={contract}
                  job={job}
                />
              </div>
              <div>
                <ResendButton
                  contract={contract}
                />
              </div>
            </div>
          </MoreButtonCard>
        ) : (
          <div className={styles.actions} style={style}>
            <AddToCalendarButton
              freelancer={freelancer}
              contract={contract}
            />
            {adminMode && (
            <AdminButton
              freelancer={freelancer}
              contract={contract}
              job={job}
            />
            )}
            <DeleteButton
              contract={contract}
              connectionId={connectionId}
            />
            <RejectButton
              freelancer={freelancer}
              contract={contract}
              job={job}
              connectionId={connectionId}
            />
            <Suspense>
              <ContractRequestsButton
                freelancerId={freelancer?.rawId as number}
                contractId={contract?.rawId as number}
                autoOpenAction={autoOpenAction}
                connectionId={connectionId}
              />
            </Suspense>
            <RequestInterviewButton
              freelancer={freelancer}
              contract={contract}
              job={job}
              autoOpenAction={autoOpenAction}
              connectionId={connectionId}
            />
            <MakeOfferButton
              freelancer={freelancer}
              contract={contract}
              job={job}
              autoOpenAction={autoOpenAction}
            />
            <InviteToApplyButton
              freelancer={freelancer}
              contract={contract}
              job={job}
            />
            <ResendButton
              contract={contract}
            />
          </div>
        )}
      </MediaQuery>
    </React.Fragment>
  )
}

export default FreelancerActions
