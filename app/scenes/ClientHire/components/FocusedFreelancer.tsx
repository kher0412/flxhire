import { Button, DialogActions, DialogContent } from '@material-ui/core'
import { ResponsiveDialog, Suspense } from 'components'
import { useCurrentUser } from 'hooks'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { useLazyLoadQuery } from 'react-relay'
import { graphql } from 'relay-runtime'
import { extractQueryParams } from 'services/router'
import { canAccessAdminConsole } from 'services/user'
import { FocusedFreelancer_Query } from '__generated__/FocusedFreelancer_Query.graphql'
import FocusedFreelancerActions from './FocusedFreelancerActions'
import Freelancer from './Freelancer'

interface IFocusedFreelancerProps {
  showAdminTools?: boolean
}

const FocusedFreelancer = ({ showAdminTools = false }: IFocusedFreelancerProps) => {
  const router = useRouter()
  const [user] = useCurrentUser()

  const query = useMemo(() => extractQueryParams(router?.asPath), [router?.asPath])
  const slugOrEmail = query?.slug
  const jobSlug = query?.job

  const data = useLazyLoadQuery<FocusedFreelancer_Query>(graphql`
    query FocusedFreelancer_Query($slugOrEmail: String, $jobSlug: String) {
      currentUser {
        firm {
          member(profileSlugOrEmail: $slugOrEmail, jobSlug: $jobSlug) {
            freelancer {
              rawId
              ...Freelancer_Freelancer
            }

            contract {
              rawId
              ...Freelancer_Contract
            }

            job {
              rawId
              ...Freelancer_Job
            }
          }
        }
      }
    }
  `, {
    slugOrEmail,
    jobSlug,
  }, {
    fetchPolicy: 'store-and-network',
  })
  const blur = useCallback(() => router.push(router.pathname, router.pathname, { shallow: true }), [router?.pathname])
  const member = data?.currentUser?.firm?.member

  if (!member?.freelancer) return null

  const autoOpenAction = extractQueryParams(router?.asPath).action

  return (
    <ResponsiveDialog
      open
      onClose={blur}
      maxWidth="lg"
      maxFullscreenWidth="1399px"
    >
      <DialogContent style={{ padding: 8 }}>
        <Suspense>
          <Freelancer
            freelancer={member?.freelancer}
            contract={member?.contract}
            job={member?.job}
            adminMode={canAccessAdminConsole(user) && showAdminTools}
            flat
            noActions
          />
        </Suspense>
      </DialogContent>
      <DialogActions>
        <Suspense>
          <FocusedFreelancerActions
            contract={member?.contract ? {
              id: member.contract.rawId,
              job_id: member?.job?.rawId,
            } : null}
            freelancer={member?.freelancer ? {
              id: member.freelancer.rawId,
            } : null}
            autoOpenAction={autoOpenAction}
          />
        </Suspense>
        <Button onClick={blur}>Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default FocusedFreelancer
