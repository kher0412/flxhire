import React from 'react'
import styles from './SectionHeading.module.css'

const SectionHeading = ({ text }) => {
  return (
    <div className={styles['section-heading']}>{text}</div>
  )
}

export default SectionHeading
