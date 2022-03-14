import React, { useMemo } from 'react'
import clsx from 'clsx'
import { Grid, Hidden } from '@material-ui/core'
import { useSelector } from 'react-redux'
import Link from 'components/Link'
import { Logo, Tags, Tag } from 'components'
import { useCurrentUser } from 'hooks'
import moment from 'moment'
import { RootState } from 'reducers'
import { isClient } from 'services/user'
import styles from './Footer.module.css'

const Footer: React.FunctionComponent = () => {
  const [user] = useCurrentUser()
  const drawer = useSelector((state: RootState) => state.layout.drawer)
  const year = useMemo(() => moment().year(), [])

  return (
    <div className={clsx(styles.container, {
      [styles.containerShift]: drawer.desktop && isClient(user),
    })}
    >
      <div className={styles.wrapper}>
        <div className={styles.footer}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={1} />

            <Grid item xs={12} sm={12} md={12} lg={3}>
              <div className={styles.company}>
                <div className={styles.logo}>
                  <Logo dark user={user} />
                </div>

                <div className={styles.about}>
                  Flexhire is a global community of top pre-screened talent available for hire.
                </div>

                <div className={styles.aboutContinue}>
                  <Link to="/how_it_works">
                    Read More
                  </Link>
                </div>
              </div>
            </Grid>

            <Hidden xsDown>
              <Grid item xs={12} sm={4} md={4} lg={1}>
                <div className={styles.column}>
                  <div className={styles.columnTitle}>
                    Pages
                  </div>

                  <Link className={styles.columnLink} to="/">
                    Home
                  </Link>

                  <Link className={styles.columnLink} to="/talent">
                    Talent
                  </Link>

                  <Link className={styles.columnLink} to="/companies">
                    Companies
                  </Link>

                  <Link className={styles.columnLink} to="/how_it_works">
                    About
                  </Link>

                  <Link className={styles.columnLink} to="/faq">
                    Faq
                  </Link>

                  <Link className={styles.columnLink} to="/blog">
                    Blog
                  </Link>
                </div>
              </Grid>
            </Hidden>

            <Hidden xsDown>
              <Grid item xs={12} sm={4} md={4} lg={1}>
                <div className={styles.column}>
                  <div className={styles.columnTitle}>
                    Follow Us
                  </div>

                  <a className={styles.columnLink} href="https://twitter.com/Flexhire">
                    Twitter
                  </a>

                  <a className={styles.columnLink} href="https://www.facebook.com/Flexhire/">
                    Facebook
                  </a>

                  <a className={styles.columnLink} href="https://www.linkedin.com/company/flexhire-llc/">
                    LinkedIn
                  </a>
                </div>
              </Grid>
            </Hidden>

            <Hidden xsDown>
              <Grid item xs={12} sm={4} md={4} lg={2}>
                <div className={styles.column}>
                  <div className={styles.columnTitle}>
                    Industries
                  </div>

                  <div className={styles.columnLink}>
                    Business Consultancy
                  </div>
                  <div className={styles.columnLink}>
                    Data Science & Analytics
                  </div>
                  <div className={styles.columnLink}>
                    Design & Creative
                  </div>
                  <div className={styles.columnLink}>
                    IT & Networking
                  </div>
                  <div className={styles.columnLink}>
                    Marketing
                  </div>
                  <div className={styles.columnLink}>
                    Sales
                  </div>
                  <div className={styles.columnLink}>
                    Software Development
                  </div>
                </div>
              </Grid>
            </Hidden>
          </Grid>
        </div>
      </div>

      <div className={styles.copyright}>
        <Tags>
          <Tag>
            Copyright &copy; {year} Flexhire LLC
          </Tag>

          <Tag>
            <Link href="/terms" className={styles.link}>Terms of Use</Link>
          </Tag>

          <Tag>
            <a href="mailto:info@flexhire.com" className={styles.link}>info@flexhire.com</a>
          </Tag>
        </Tags>
      </div>
    </div>
  )
}

export default Footer
