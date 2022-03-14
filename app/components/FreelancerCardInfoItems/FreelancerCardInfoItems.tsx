import React, { useState } from 'react'
import { Collapse, Divider } from '@material-ui/core'
import { Button } from 'components/themed'
import { classList } from 'services/styles'
import { useMediaQuery } from 'hooks/useMediaQuery'
import { ArrowDropDown } from '@material-ui/icons'
import styles from './FreelancerCardInfoItems.module.css'

interface IFreelancerCardInfoItemsProps {
  children?: any
  className?: string
  props?: any
}

export default function FreelancerCardInfoItems({ children, className, props }: IFreelancerCardInfoItemsProps) {
  const [isOpen, setOpenState] = useState(false)
  const isMobile = useMediaQuery('(max-width: 800px)')

  return (
    <div data-cy="freelancer-info" className={classList(styles.container, className)} {...props}>
      {isMobile && (
        <Divider style={{ margin: '0', width: '100%' }} />
      )}

      <Collapse in={!isMobile || isOpen} style={{ width: '100%' }}>
        {children}
      </Collapse>

      {isMobile && (
        <Button fullWidth onClick={() => setOpenState(!isOpen)} style={{ margin: '12px 12px 0 12px' }}>
          {!isOpen && (
            <React.Fragment>
              <ArrowDropDown style={{ opacity: 0 }} /> Expand Details <ArrowDropDown style={{ marginLeft: 12 }} />
            </React.Fragment>
          )}

          {isOpen && (
            <React.Fragment>
              <ArrowDropDown style={{ opacity: 0 }} /> Hide Details <ArrowDropDown style={{ marginLeft: 12, transform: 'rotate(180deg)' }} />
            </React.Fragment>
          )}
        </Button>
      )}
    </div>
  )
}
