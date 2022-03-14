import React from 'react'
import styles from './FlexhireAdvantage.module.css'

const containerStyle = {
  background: `url('${require('assets/images/home/background2.png?url')}') center center no-repeat`,
  backgroundSize: 'cover',
}

const FlexhireAdvantage = () => (
  <div className={styles['flexhire-advantage-container']} style={containerStyle}>
    <div className={styles.content}>
      <div className={styles.title}>THE FLEXHIRE ADVANTAGE</div>
      <div className={styles.description}>Scale your team with top prescreened talent from around the world</div>
      <div className={styles.advantages}>
        <div className={styles.advantage}>
          <div className={styles['advantage-title']}>Verified Experts</div>
          <div className={styles['advantage-description']}>Members are technically screened for expertise</div>
        </div>
        <div className={styles.advantage}>
          <div className={styles['advantage-title']}>Great Communicators</div>
          <div className={styles['advantage-description']}>Excellent communication skills are top priority</div>
        </div>
        <div className={styles.advantage}>
          <div className={styles['advantage-title']}>Available on Demand</div>
          <div className={styles['advantage-description']}>Hire experts in the specific skills you need</div>
        </div>
        <div className={styles.advantage}>
          <div className={styles['advantage-title']}>Try Risk Free</div>
          <div className={styles['advantage-description']}>
            There is no cost to join FlexHire. Sign-up and work with the best talent today!
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default FlexhireAdvantage
