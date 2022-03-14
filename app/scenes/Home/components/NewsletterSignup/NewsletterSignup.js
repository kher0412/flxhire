import React from 'react'
import MediaQuery from 'components/MediaQuery'
import { TextField, IconButton } from '@material-ui/core'
import { Button } from 'components/themed'
import { AnimBox } from 'components'
import { Send } from '@material-ui/icons'
import styles from './NewsletterSignup.module.css'

export default class NewsletterSignup extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <AnimBox grow>
          <div className={styles.icon}>
            <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.25 21.375C18.185 21.375 21.375 18.185 21.375 14.25C21.375 10.315 18.185 7.125 14.25 7.125C10.315 7.125 7.125 10.315 7.125 14.25C7.125 18.185 10.315 21.375 14.25 21.375Z" fill="url(#paint0_linear)" />
              <path d="M19 59.375C17.6883 59.375 16.625 58.3117 16.625 57V35.625C16.625 32.3253 17.5975 29.2519 19.2628 26.6628C19.4041 26.4432 19.2611 26.125 19 26.125H9.5C4.26075 26.125 0 30.3857 0 35.625V47.5C0 48.8117 1.06332 49.875 2.375 49.875C3.68668 49.875 4.75 50.9383 4.75 52.25V58.1875C4.75 58.4777 4.75 58.6227 4.75376 58.7454C4.88345 62.9712 8.27882 66.3666 12.5046 66.4962C12.6273 66.5 12.7723 66.5 13.0625 66.5H17.8125C19.78 66.5 21.375 64.905 21.375 62.9375V61.75C21.375 60.4383 20.3117 59.375 19 59.375Z" fill="url(#paint1_linear)" />
              <path d="M61.75 21.375C65.685 21.375 68.875 18.185 68.875 14.25C68.875 10.315 65.685 7.125 61.75 7.125C57.815 7.125 54.625 10.315 54.625 14.25C54.625 18.185 57.815 21.375 61.75 21.375Z" fill="url(#paint2_linear)" />
              <path d="M57 59.375C58.3117 59.375 59.375 58.3117 59.375 57V35.625C59.375 32.3253 58.4025 29.2519 56.7372 26.6628C56.5959 26.4432 56.7389 26.125 57 26.125H66.5C71.7393 26.125 76 30.3857 76 35.625V47.5C76 48.8117 74.9367 49.875 73.625 49.875C72.3133 49.875 71.25 50.9383 71.25 52.25V58.1875C71.25 58.4777 71.25 58.6227 71.2462 58.7454C71.1165 62.9712 67.7212 66.3666 63.4954 66.4962C63.3727 66.5 63.2277 66.5 62.9375 66.5H58.1875C56.22 66.5 54.625 64.905 54.625 62.9375V61.75C54.625 60.4383 55.6883 59.375 57 59.375Z" fill="url(#paint3_linear)" />
              <path d="M42.75 23.75H33.25C26.7021 23.75 21.375 29.0771 21.375 35.625V51.0625C21.375 53.03 22.97 54.625 24.9375 54.625C26.905 54.625 28.5 56.22 28.5 58.1875V64.125C28.5 65.5184 28.5 66.2151 28.5866 66.7988C29.1036 70.2845 31.8405 73.0214 35.3262 73.5384C35.9099 73.625 36.6066 73.625 38 73.625C39.3934 73.625 40.0901 73.625 40.6738 73.5384C44.1595 73.0214 46.8964 70.2845 47.4134 66.7988C47.5 66.2151 47.5 65.5184 47.5 64.125V58.1875C47.5 56.22 49.095 54.625 51.0625 54.625C53.03 54.625 54.625 53.03 54.625 51.0625V35.625C54.625 29.0771 49.2979 23.75 42.75 23.75Z" fill="url(#paint4_linear)" />
              <path d="M38 19C43.2467 19 47.5 14.7467 47.5 9.5C47.5 4.25329 43.2467 0 38 0C32.7533 0 28.5 4.25329 28.5 9.5C28.5 14.7467 32.7533 19 38 19Z" fill="url(#paint5_linear)" />
              <defs>
                <linearGradient id="paint0_linear" x1="14.25" y1="7.125" x2="14.25" y2="21.375" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
                <linearGradient id="paint1_linear" x1="10.6875" y1="26.125" x2="10.6875" y2="66.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
                <linearGradient id="paint2_linear" x1="61.75" y1="7.125" x2="61.75" y2="21.375" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
                <linearGradient id="paint3_linear" x1="65.3125" y1="26.125" x2="65.3125" y2="66.5" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
                <linearGradient id="paint4_linear" x1="38" y1="23.75" x2="38" y2="73.625" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
                <linearGradient id="paint5_linear" x1="38" y1="0" x2="38" y2="19" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#35CC84" />
                  <stop offset="1" stopColor="#1FC977" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </AnimBox>

        <AnimBox>
          <div className={styles.heading}>
            Join our distribution list to see weekly <strong>pre-screened talent</strong> direct to your inbox
          </div>
        </AnimBox>

        <AnimBox delay={200}>
          <div className={styles.subscribe}>
            <TextField
              variant="outlined"
              className={styles.input}
              placeholder="Your Email Address"
            />

            <AnimBox delay={400} grow style={{ display: 'inline-block' }}>
              <MediaQuery minWidth={701}>
                <Button className={styles.button} color="primary">
                  Subscribe
                </Button>
              </MediaQuery>

              <MediaQuery maxWidth={700}>
                <IconButton variant="contained" className={styles.iconButton} color="primary">
                  <Send style={{ color: '#fff' }} />
                </IconButton>
              </MediaQuery>
            </AnimBox>
          </div>
        </AnimBox>
      </div>
    )
  }
}
