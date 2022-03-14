import React from 'react'
import NavLink from 'components/NavLink'
import { Button } from '@material-ui/core'
import { goToLogin, goToSignup } from 'services/router'
import { NextRouter } from 'next/router'
import styles from './GuestDesktop.module.css'

const GuestDesktop = ({ router }: { router: NextRouter }) => (
  <React.Fragment>
    <NavLink to="/talent" label="For Talent" data-cy="for-talent" />
    <NavLink to="/companies" label="For Companies" data-cy="guest-navigation-for-companies" />
    <NavLink to="/how_it_works" label="About" data-cy="guest-navigation-how-it-works" />
    <NavLink to="/faq" label="FAQ" data-cy="guest-navigation-faq" />

    {process.env.FLEXHIRE_ENABLE_BLOG && (
    <NavLink to="/blog" label="BLOG" data-cy="guest-navigation-blog" />
    )}

    <NavLink href="/[...slugs]" as="/careers" label="Careers" data-cy="guest-navigation-careers" />

    <div className={styles.navigation}>
      <NavLink onClick={() => goToLogin(router)} label="LOGIN" data-cy="guest-navigation-login" />

      <Button
        onClick={() => goToSignup(router)}
        variant="contained"
        data-cy="guest-navigation-signup"
        className={styles.primaryButton}
        style={{
          background: 'linear-gradient(to bottom, #35CC84 0%, #1FC977 100%)',
          color: '#fff',
          textDecoration: 'none',
          display: 'inline-block',
          boxShadow: 'none',
          margin: '0 0 0 12px',
          paddingLeft: 12,
          paddingRight: 12,
          borderRadius: 8,
          letterSpacing: 2,
        }}
      >
        Sign Up
      </Button>
    </div>
  </React.Fragment>
)

export default GuestDesktop
