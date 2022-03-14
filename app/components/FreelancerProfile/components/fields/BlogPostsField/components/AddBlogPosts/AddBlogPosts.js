import React from 'react'
import { browserHistory } from 'services/router'
import { ConfirmButton } from 'components'
import { AddCircle } from '@material-ui/icons'
import styles from './AddBlogPosts.module.css'

export default class AddBlogPosts extends React.PureComponent {
  render() {
    const { isProfileCreationMode } = this.props

    return (
      <div className={styles.container}>
        <div>
          <ConfirmButton
            disabled={isProfileCreationMode}
            onClick={this.handleButtonClick}
            className={styles.link}
            dialogTitle="Add Post"
            dialogMessage="You will now be redirected to the blog article editor. Any unsaved changes to your profile will be lost. Continue?"
            dialogConfirmLabel="Continue"
          >
            <AddCircle className={styles['button-icon']} /> Add Post
          </ConfirmButton>

          <div className={styles.text}>
            {isProfileCreationMode && (
              <React.Fragment>
                Finish creating your profile first,
                and then improve your profile and increase views by writing blog posts.
              </React.Fragment>
            )}

            {!isProfileCreationMode && (
              <React.Fragment>
                Improve your profile and increase views by writing blog posts.
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    )
  }

  handleButtonClick = () => {
    browserHistory.push('/blog/create-post')
  }
}
