import React, { useCallback } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { IconButton, Tooltip } from '@material-ui/core'
import { getCurrentLocationFull } from 'services/router'
import AttachmentIcon from '@material-ui/icons/Attachment'
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { classList } from 'services/styles'
import { isGuest } from 'services/user'
import { useCurrentUser, useSnackbar } from 'hooks'
import { useRouter } from 'next/router'
import styles from './ShareWidget.module.css'

interface IShareWidgetProps {
  url?: string
  disabled?: boolean
  referral?: boolean
  className?: string
}

const ShareWidget = (props: IShareWidgetProps) => {
  const { disabled, url: urlProp, className, referral, ...restProps } = props
  const router = useRouter()
  const url = urlProp || getCurrentLocationFull(router)
  const [user] = useCurrentUser()
  const showSnackbarMessage = useSnackbar()
  const guest = isGuest(user)
  const hasReferral = Boolean(referral)

  const handleCopyLinkClick = useCallback(async () => {
    if (disabled) return

    if (hasReferral) {
      if (guest) {
        showSnackbarMessage('Link copied to clipboard. To share a referral link instead, log in to your account.')
      } else {
        showSnackbarMessage('Referral link copied to clipboard')
      }
    } else {
      showSnackbarMessage('Link copied to clipboard')
    }
  }, [disabled, guest, guest])

  const handleFBShareClick = useCallback(() => {
    window.open(
      `https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes',
    )
  }, [url])

  const handleTwitterShareClick = useCallback((e) => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(url)}`,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes',
    )
  }, [url])

  const handleLinkedinShareClick = useCallback((e) => {
    window.open(
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`,
      '_blank',
    )
  }, [url])

  return (
    <div className={classList(styles['share-buttons'], className)} {...restProps}>
      <Tooltip title="Copy link">
        <span style={{ display: 'inline-block' }}>
          <CopyToClipboard
            text={url}
            onCopy={handleCopyLinkClick}
          >
            <IconButton href={url} onClick={e => e.preventDefault()} disabled={disabled} style={{ padding: 0 }}>
              <AttachmentIcon />
            </IconButton>
          </CopyToClipboard>
        </span>
      </Tooltip>

      <Tooltip title="Share on Facebook">
        <IconButton onClick={handleFBShareClick} disabled={disabled}>
          <FaFacebook />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on LinkedIn">
        <IconButton onClick={handleLinkedinShareClick} disabled={disabled}>
          <FaLinkedin />
        </IconButton>
      </Tooltip>

      <Tooltip title="Share on Twitter">
        <IconButton onClick={handleTwitterShareClick} disabled={disabled}>
          <FaTwitter />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export default ShareWidget
