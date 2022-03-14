import React from 'react'
import CodeTestBrowser from 'components/CodeTestBrowser'
import styles from './AddSampleWork.module.css'

export default class AddSampleWork extends React.PureComponent {
  render() {
    const { onProjectSubmissionSubmit, isProfileCreationMode } = this.props

    return (
      <div className={styles.container}>
        <div>
          <CodeTestBrowser
            disabled={isProfileCreationMode}
            onProjectSubmissionSubmit={onProjectSubmissionSubmit}
          />

          <div className={styles.text}>
            {isProfileCreationMode && (
              <React.Fragment>
                Finish creating your profile first,
                and then share your expertise with the world to improve your profile!
              </React.Fragment>
            )}

            {!isProfileCreationMode && (
              <React.Fragment>
                Sharing past projects is a great way to share your expertise with the world and improve your profile!
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }
}
