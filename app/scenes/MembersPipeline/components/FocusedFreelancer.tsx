import React from 'react'
import {
  ResponsiveDialog,
  Suspense,
} from 'components'
import { DialogContent, DialogActions } from '@material-ui/core'
import { Button } from 'components/themed'
import { graphql, useLazyLoadQuery } from 'react-relay'
import { useRouter } from 'next/router'
import { extractQueryParams } from 'services/router'
import { FocusedFreelancer_MemberPipelineQuery } from '__generated__/FocusedFreelancer_MemberPipelineQuery.graphql'
import Freelancer from './Freelancer'
import FreelancerActions from './FreelancerActions'

const FocusedFreelancer = () => {
  const router = useRouter()
  const slug = extractQueryParams(router?.asPath)?.focus
  const data = useLazyLoadQuery<FocusedFreelancer_MemberPipelineQuery>(graphql`
    query FocusedFreelancer_MemberPipelineQuery($freelancerSlug: String, $hasSlug: Boolean!) {
      freelancer: user(slug: $freelancerSlug) @include(if: $hasSlug) {
        ...Freelancer_FreelancerMemberPipelineFragment
        ...FreelancerActions_FreelancerMemberPipelineActionsFragment
      }
    }
  `, {
    freelancerSlug: slug,
    hasSlug: Boolean(slug),
  }, {
    fetchPolicy: 'store-and-network',
  })
  const blurFocusedMember = () => {} // TODO: remove slug from page url so query automatically clears?
  const focusedMember = data?.freelancer
  if (!focusedMember) return null

  return (
    <ResponsiveDialog
      open
      onClose={blurFocusedMember}
      maxWidth="lg"
      maxFullscreenWidth="1399px"
    >
      <DialogContent>
        <Suspense>
          <Freelancer
            freelancer={focusedMember}
            flat
          />
        </Suspense>
      </DialogContent>
      <DialogActions>
        <FreelancerActions
          freelancer={focusedMember}
        />
        <Button onClick={blurFocusedMember}>Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  )
}

export default FocusedFreelancer
