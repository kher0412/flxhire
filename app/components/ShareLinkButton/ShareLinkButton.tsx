import React, { useCallback, useState } from 'react'
import { Popover } from '@material-ui/core'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Button } from 'components/themed'
import { getAPIClient } from 'api'
import { trackError } from 'services/analytics'
import { getErrorText } from 'services/error'
import { useSnackbar } from 'hooks'
import { graphql, useFragment } from 'react-relay'
import { ShareLinkButton_Freelancer$key } from '__generated__/ShareLinkButton_Freelancer.graphql'
import { ShareLinkButton_Job$key } from '__generated__/ShareLinkButton_Job.graphql'
import { Link } from '@material-ui/icons'

interface IShareLinkButtonProps {
  freelancer: ShareLinkButton_Freelancer$key
  job?: ShareLinkButton_Job$key
  membersPipeline?: boolean
}

const ShareLinkButton = (props: IShareLinkButtonProps) => {
  const { freelancer: freelancerProp, job: jobProp, membersPipeline = false } = props
  const [open, setOpen] = useState(false)
  const [link, setLink] = useState(null as string)
  const [anchorEl, setAnchorEl] = useState(null)
  const [error, setError] = useState(null)
  const showSnackbarMessage = useSnackbar()

  const freelancer = useFragment(graphql`
    fragment ShareLinkButton_Freelancer on User {
      rawId
      profile {
        slug
      }
    }
  `, freelancerProp)
  const job = useFragment(graphql`
    fragment ShareLinkButton_Job on Job {
      rawId
    }
  `, jobProp)

  const openPopover = useCallback(async (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
    if (!link) {
      try {
        if (membersPipeline && freelancer?.profile?.slug) {
          setLink(`${process.env.ROOT_URL}/members_pipeline?focus=${freelancer.profile.slug}`)
        } else if (!membersPipeline && freelancer?.rawId && job?.rawId) {
          const candidateLink = await getAPIClient().createLink(freelancer.rawId, job?.rawId)
          setLink(`${process.env.ROOT_URL}/view/${candidateLink.token}`)
        }
      } catch (err) {
        trackError(err)
        setError(err)
      }
    }
  }, [freelancer?.profile?.slug, freelancer?.rawId, job?.rawId])

  const close = () => {
    setOpen(false)
    setError(null)
  }

  const onCopy = () => {
    close()
    showSnackbarMessage('Link copied to clipboard')
  }

  const freelancerId = freelancer?.rawId

  if (!freelancerId) return null

  return (
    <React.Fragment>
      <Popover
        id={freelancer?.profile?.slug}
        open={open}
        onClose={close}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: 12 }}>
          {!link && !error && 'Generating link...'}
          {error && getErrorText(error)}
          {!error && link && (
            <CopyToClipboard
              text={link}
              onCopy={onCopy}
            >
              <Button fullWidth data-cy="copy-link">
                <Link /> Copy to Clipboard
              </Button>
            </CopyToClipboard>
          )}
        </div>
      </Popover>
      <Button iconOnly data-cy="share-link" onClick={openPopover}>
        <Link />
      </Button>
    </React.Fragment>
  )
}

export default ShareLinkButton
