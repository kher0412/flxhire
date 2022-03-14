import React from 'react'
import { MonetizationOn, CalendarToday } from '@material-ui/icons'
import { contractFullTime } from 'services/freelancer'
import { isUnsentJobApplication, isStartedContract, isOfferStage } from 'services/contract'
import { formatAsCurrency, formatAsDate } from 'services/formatting'
import { FreelancerCardInfoItem, MoreButtonCard } from 'components'
import { IProfileJobType, JobPositionType, IContractForClient, Currency, RateMode } from 'types'
import { graphql, useFragment } from 'react-relay'
import { FreelancerRates_Freelancer$key } from '__generated__/FreelancerRates_Freelancer.graphql'
import { FreelancerRates_Contract$key } from '__generated__/FreelancerRates_Contract.graphql'

interface IFreelancerRatesProps {
  freelancer: FreelancerRates_Freelancer$key
  contract?: FreelancerRates_Contract$key
}

const FreelancerRates = ({ freelancer: freelancerProp, contract: contractProp }: IFreelancerRatesProps) => {
  const freelancer = useFragment(graphql`
    fragment FreelancerRates_Freelancer on User {
      firstName
      profile {
        clientRate {
          currency {
            code
          }
          value
        }
        freelancerRate {
          currency {
            code
          }
          value
        }
        jobTypes
        availabilityType
        annualCompensation {
          currency {
            code
          }
          value
        }
      }
    }
  `, freelancerProp)

  const contract = useFragment(graphql`
    fragment FreelancerRates_Contract on Contract {
      status
      freelancerFirstName
      clientRate {
        currency {
          code
        }
        value
      }
      freelancerRate {
        currency {
          code
        }
        value
      }
      annualCompensation {
        currency {
          code
        }
        value
      }
      currency{
        code
      }
      invitationType
      availabilityType
      positionTypes
      rateMode
      nextSalaryInvoiceDate
      dailyFee {
        currency {
          code
        }
        value
      }
    }
  `, contractProp)

  if ((!freelancer || !freelancer.profile) && !contract) return null

  const profile = freelancer?.profile
  const partialContract = { status: contract?.status as IContractForClient['status'] }
  const hasContract = contract && !isUnsentJobApplication(partialContract)

  const offerHasBeenMade = isStartedContract(partialContract) || isOfferStage(partialContract) || contract?.invitationType === 'invitation' || contract?.status === 'expired'
  const useContractRate = hasContract && offerHasBeenMade
  const positionTypes: (IProfileJobType | JobPositionType)[] = (
    useContractRate ? contract.positionTypes as JobPositionType[] : profile?.jobTypes as IProfileJobType[]
  )

  // Note: profile rate should be used if present because it represents the rate for this freelancer for the current user
  // Contract rate should be used if the profile rate is missing, it's needed for invitations where the freelancer didn't sign up yet
  const rateMode = contract?.rateMode
  const rateCurrency = contract?.currency ? contract?.currency : contract?.clientRate.currency
  const rateFormatOptions = { currency: rateCurrency ? rateCurrency : profile?.clientRate.currency as Currency }
  const rateSuffix = !rateMode || rateMode === 'hour' ? 'hr' : rateMode
  const clientRate = useContractRate && contract.clientRate ? contract.clientRate.value : profile?.clientRate.value
  const clientRateText = clientRate ? `${formatAsCurrency(clientRate, rateFormatOptions)}/${rateSuffix}` : 'N/A'
  const freelancerRate = useContractRate && contract.freelancerRate ? contract.freelancerRate.value : profile?.freelancerRate.value
  const freelancerRateText = freelancerRate ? `${formatAsCurrency(freelancerRate, rateFormatOptions)}/${rateSuffix}` : 'N/A'
  const annualCompensation = useContractRate && contract.annualCompensation ? contract.annualCompensation : profile?.annualCompensation
  const annualCompensationText = annualCompensation ? formatAsCurrency(annualCompensation.value, { withCents: false, ...rateFormatOptions }) : 'N/A'

  const availabilityType = hasContract ? contract.availabilityType : profile?.availabilityType
  const isOffer = hasContract && ['offer_made', 'offer_rejected'].indexOf(contract.status) >= 0
  const isInterview = hasContract && ['pending', 'interview_accepted', 'interview_rejected'].indexOf(contract.status) >= 0
  const rateType = Array.isArray(availabilityType) && availabilityType.length === 1 ? `(${contractFullTime(availabilityType).join(', ')})` : ''

  const name = freelancer?.firstName || contract?.freelancerFirstName
  const nextSalaryPayment = contract?.nextSalaryInvoiceDate ? formatAsDate(contract?.nextSalaryInvoiceDate) : null

  let ratePrefix = ''
  if (isInterview) ratePrefix = 'Potential'
  if (isOffer) ratePrefix = 'Offered'

  // TODO: fix assuming the contract is freelance if offer has been made. This is needed now because some offers end up being permanent somehow
  let isPermanent = Boolean(Array.isArray(positionTypes) && positionTypes.includes('permanent')) && !offerHasBeenMade
  // TODO: fix backend issue where profile job_types value is "freelance" but job/contract position_type value is "freelancer"
  let isFreelance = offerHasBeenMade || Boolean(Array.isArray(positionTypes) && (positionTypes.includes('freelance') || positionTypes.includes('freelancer')))
  // TODO: some older contracts don't have positionTypes set correctly so the rate does not show up.
  // If this backend/DB issue is fixed, we can remove this workaround
  if (hasContract && !isPermanent && !isFreelance) isFreelance = true

  let shouldShowPermanentCompensationExplanation = (!isStartedContract(partialContract) && contract?.status !== 'expired')

  return (
    <React.Fragment>
      {isFreelance && (
        <MoreButtonCard
          component={props => (
            <FreelancerCardInfoItem
              {...props}
              button
              icon={<MonetizationOn />}
              primary={(
                <React.Fragment>
                  {clientRateText}
                </React.Fragment>
              )}
              secondary={['Compensation', rateType].filter(x => x.length > 0).join(' ')}
              data-cy="compensation-hourly-rate"
            />
          )}
        >
          <div style={{ maxWidth: 480 }} data-cy="compensation-fees">
            You pay {clientRateText}, {name} receives {freelancerRateText}.

            {(contract?.dailyFee?.value > 0) && (
              <React.Fragment>
                <br />
                <br />
                This contract also has an additional ${contract?.dailyFee.value} daily fee.
              </React.Fragment>
            )}

            {nextSalaryPayment && (
              <React.Fragment>
                <br />
                <br />
                {name}'s {isOffer ? '' : 'next '}paycheck will be invoiced to you on {nextSalaryPayment}, then every month after that.
              </React.Fragment>
            )}

            {!offerHasBeenMade && (
              <React.Fragment>
                <br /><br />
                While {name} has listed {freelancerRateText} as the rate they would be interested in this role,
                {' '}
                you are free to offer a lower rate in or post interview.
              </React.Fragment>
            )}
          </div>
        </MoreButtonCard>
      )}

      {isPermanent && (
        <MoreButtonCard
          disabled={isStartedContract(partialContract) || contract?.status === 'expired'}
          component={props => (
            <FreelancerCardInfoItem
              {...props}
              onClick={shouldShowPermanentCompensationExplanation ? props.onClick : undefined}
              button={shouldShowPermanentCompensationExplanation}
              icon={<CalendarToday />}
              primary={(
                <React.Fragment>
                  {annualCompensationText}
                </React.Fragment>
              )}
              secondary="Annual Rate"
              data-cy={[ratePrefix.toLowerCase(), 'annual-compensation'].filter(x => x.length).join('-')}
            />
          )}
        >
          <div style={{ maxWidth: 480 }}>
            Flexhire charges 20% of the first year annual salary for permanent hires.
          </div>
        </MoreButtonCard>
      )}
    </React.Fragment>
  )
}

export default FreelancerRates
