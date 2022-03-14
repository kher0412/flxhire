import React from 'react'
import { PageBundlePlaceholder } from 'components'
import localStorage from 'services/localStorage'
import { KEY_LINKEDIN_AUTH_CODE } from 'services/linkedin'
import { useOnMount } from 'hooks'
import { useRouter } from 'next/router'
import { extractQueryParams } from 'services/router'

const LinkedinCallback = () => {
  const router = useRouter()
  useOnMount(() => {
    // this storage key is being polled for in the acquireLinkedInAccessToken function
    // setting it here will result in that async flow continuing with access token acquisition
    // TODO: figure out if we can remove polling.
    // TODO: use extractQueryParams(router?.asPath) to pull out the parameter
    localStorage.setItem(KEY_LINKEDIN_AUTH_CODE, extractQueryParams(router?.asPath)?.code)
  })
  const error = extractQueryParams(router?.asPath)?.error_description

  return (
    <PageBundlePlaceholder
      error={error}
    />
  )
}

export default LinkedinCallback
