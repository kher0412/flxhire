import React from 'react'
import { useCurrentUser, useOnMount } from 'hooks'
import { Helmet } from 'react-helmet'
import { isPrerendering } from 'services/prerender'
import { loadScript } from 'services/scripts'
import { WithRouterProps } from 'next/dist/client/with-router'
import { ChatBubble } from 'components'
import styles from './VideoMeet.module.css'

const WHITE_LOGO_URL = 'https://flexhire-images-for-emails.s3.amazonaws.com/flexhire-logo-white.png'

const VideoMeet = ({ router }: WithRouterProps) => {
  const [user] = useCurrentUser()
  useOnMount(async () => {
    if (isPrerendering()) return
    await loadScript('https://meet.jit.si/external_api.js')
    const roomName = router.query.id
    const w = window as any
    const jitsi = new w.JitsiMeetExternalAPI('meet.jit.si', {
      roomName: `flexhire_${roomName}`,
      width: '100%',
      height: '100%',
      parentNode: document.getElementById('video-meeting-container'),
      userInfo: {
        email: user.email,
        displayName: user.first_name,
      },
      configOverwrite: {
        enableWelcomePage: false,
        disableProfile: true,
        analytics: {
          googleAnalyticsTrackingId: null,
        },
        disableInviteFunctions: true,
        doNotStoreRoom: true,
        disableRemoteMute: false,
        dynamicBrandingUrl: null,
        toolbarButtons: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'sharedvideo', 'settings', 'raisehand',
          'videoquality', 'filmstrip', 'stats', 'shortcuts',
          'tileview', 'select-background', 'mute-everyone', 'mute-video-everyone',
        ],
      },
      interfaceConfigOverwrite: {
        APP_NAME: 'Flexhire Meet',
        NATIVE_APP_NAME: 'Flexhire Meet',
        RECENT_LIST_ENABLED: false,
        SHOW_BRAND_WATERMARK: true,
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        MOBILE_APP_PROMO: false,
        DISPLAY_WELCOME_FOOTER: false,
        GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
        HIDE_INVITE_MORE_HEADER: true,
        DEFAULT_LOGO_URL: WHITE_LOGO_URL,
        DEFAULT_WELCOME_PAGE_LOGO_URL: WHITE_LOGO_URL,
        BRAND_WATERMARK_LINK: 'https://flexhire.com',
        SHARING_FEATURES: [],
        SETTINGS_SECTIONS: [
          'devices',
        ],
      },
    })
    w.jitsiApi = jitsi
  })
  return (
    <React.Fragment>
      <Helmet>
        <title>Video Meeting</title>
      </Helmet>
      <div id="video-meeting-container" className={styles.container} />
      <ChatBubble
        style={{
          position: 'absolute',
          left: 15,
          bottom: 80,
          zIndex: 1,
        }}
      />
    </React.Fragment>
  )
}

export default VideoMeet
