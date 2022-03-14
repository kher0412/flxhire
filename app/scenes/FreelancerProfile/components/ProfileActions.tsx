import React, { useState, useCallback } from 'react'
import { useCurrentUser } from 'hooks'
import { useRouter } from 'next/router'
import { IFreelancer, IContractForClient, IChatUser } from 'types'
import dynamic from 'services/dynamic'
import { isProduction } from 'services/environment'
import { ResponsiveButton, MasqButton, NotifyAboutJob, Suspense, ChatButton } from 'components'

import { isUnsentJobApplication, isStartedContract } from 'services/contract'
import { Button } from 'components/themed'
import { isClient, isRealAdmin, isGuest } from 'services/user'
import { goToSignup, browserHistory } from 'services/router'
import { Send } from '@material-ui/icons'
import type { HirePipelineActionsComponent } from './HirePipelineActions/HirePipelineActions'
import styles from '../FreelancerProfile.module.css'

// Import some components dynamically because they are not needed immediately
const HirePipelineActions = dynamic(
  () => import(/* webpackChunkName: "HirePipelineActions" */'./HirePipelineActions'),
  { ssr: false },
) as HirePipelineActionsComponent

interface ContainerOptions {
  freelancer: IFreelancer
  contracts: IContractForClient[]
  contacts: IChatUser[]
}

const useContainer = ({ freelancer, contracts, contacts }: ContainerOptions) => {
  const [user] = useCurrentUser()
  const router = useRouter()
  const guest = isGuest(user)
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false)
  const isAdmin = isRealAdmin(user)

  const redirectClient = useCallback(() => goToSignup(router, 'company', true), [router])

  const makeOffer = useCallback(() => {
    if (isClient(user)) {
      browserHistory.push(`/client/invitation_team?member=${freelancer?.id}`)
    } else if (isGuest(user)) {
      redirectClient()
    }
  }, [guest, isClient(user)])

  const openNotifyDialog = useCallback(() => {
    if (isClient(user)) {
      setNotifyDialogOpen(true)
    } else if (isGuest(user)) {
      redirectClient()
    }
  }, [guest, isClient(user)])

  const canNotify = guest || freelancer?.can_notify
  const canMakeOffer = guest || freelancer?.can_make_offer
  const hasContracts = contracts.length > 0 && !isStartedContract(contracts[0]) && !isUnsentJobApplication(contracts[0])
  const showChatButton = Boolean(freelancer?.direct_chat_thread_id || (freelancer?.id && (isAdmin || contacts.find(c => c.id === freelancer.id))))
  const contract = hasContracts ? contracts[0] : null
  const showHirePipelineActions = hasContracts

  return {
    canNotify,
    canMakeOffer,
    showChatButton,
    contract,
    showHirePipelineActions,
    notifyDialogOpen,
    setNotifyDialogOpen,
    makeOffer,
    openNotifyDialog,
    user,
    isAdmin,
    hasContracts,
    router,
  }
}

interface IClientActionsProps extends ContainerOptions {
  isInSignupFlow: boolean
  refresh: () => void
}

const ClientActions = (props: IClientActionsProps) => {
  const {
    refresh,
    isInSignupFlow,
    freelancer,
  } = props

  const {
    canNotify,
    canMakeOffer,
    showChatButton,
    contract,
    showHirePipelineActions,
    notifyDialogOpen,
    setNotifyDialogOpen,
    makeOffer,
    openNotifyDialog,
    user,
    isAdmin,
    hasContracts,
    router,
  } = useContainer(props)

  if (!isGuest(user) && !isClient(user)) {
    if (isAdmin) {
      return (
        <div className={styles.actions}>
          <MasqButton record={freelancer} />
        </div>
      )
    }

    return null
  }

  if (!canNotify && !canMakeOffer && !hasContracts && isProduction()) return null

  if (isInSignupFlow) {
    return (
      <div className={styles.actions}>
        <Button color="primary" onClick={() => router.back()}>
          Continue
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.actions}>
      {!showHirePipelineActions && (
        <React.Fragment>
          {canNotify && (
            <ResponsiveButton
              icon={<Send />}
              label="Share Opportunity"
              mobileLabel="Notify"
              variant="outlined"
              onClick={openNotifyDialog}
              data-cy="notify-freelancer"
            />
          )}

          {canMakeOffer && (
            <ResponsiveButton
              color="primary"
              variant="contained"
              label="Hire Me"
              mobileLabel="Hire Me"
              onClick={makeOffer}
              data-cy="make-offer"
            />
          )}

          {showChatButton && (
            <ChatButton
              threadId={freelancer.direct_chat_thread_id}
              recipientId={freelancer.id}
              contact={{
                first_name: freelancer?.first_name,
                name: `${freelancer?.first_name || ''} ${freelancer?.last_name || ''}`.trim(),
                avatar_url: freelancer?.avatar_url,
                last_seen_at: freelancer?.last_seen_at,
              }}
            />
          )}

          <MasqButton record={freelancer} />
        </React.Fragment>
      )}

      {showHirePipelineActions && (
        <Suspense>
          <HirePipelineActions
            freelancer={{ id: freelancer?.id }}
            contract={{ id: contract?.id }}
          />
        </Suspense>
      )}

      <Suspense>
        <NotifyAboutJob
          open={notifyDialogOpen}
          onClose={() => setNotifyDialogOpen(false)}
          freelancer={freelancer}
          afterSend={refresh}
        />
      </Suspense>
    </div>
  )
}

export default ClientActions
