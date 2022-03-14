import React from 'react'
import { Collapse, IconButton, Tooltip } from '@material-ui/core'
import { FocusFadeGroup } from 'components'
import { TextArea } from 'components/themed'
import { Create } from '@material-ui/icons'
import styles from './TextIntroductionField.module.css'

const PLACEHOLDER = 'Write a few lines about yourself and your professional background...'

export default class TextIntroductionField extends React.PureComponent {
  state = {
    isEditMode: false,
  }

  render() {
    const { editable, input, meta } = this.props
    const { isEditMode } = this.state

    return (
      <FocusFadeGroup focused={isEditMode}>
        <Collapse in={!isEditMode}>
          <div className={styles.container} onClick={this.handleEditClick} role="button">
            <div className={styles.text} style={editable ? { paddingRight: 24, paddingLeft: 24 } : undefined}>
              {input.value || PLACEHOLDER}

              {meta.touched && meta.error && (
                <span className={styles.error} data-cy="profile-introduction-error">
                  - {meta.error}
                </span>
              )}

              {editable && (
                <div className={styles.edit}>
                  <Tooltip title="Edit text introduction">
                    <IconButton data-cy="profile-introduction-edit">
                      <Create />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        </Collapse>

        <Collapse in={isEditMode}>
          <div ref={div => this.textAreaWrapper = div}>
            <TextArea
              className={styles.textarea}
              placeholder={PLACEHOLDER}
              label="Introduction"
              input={{
                ...input,
                onBlur: this.handleBlur,
                name: 'introduction',
              }}
              maxlength={1500}
            />
          </div>
        </Collapse>
      </FocusFadeGroup>
    )
  }

  handleEditClick = () => {
    if (!this.props.editable) return

    this.setState({
      isEditMode: true,
    })

    window.setTimeout(() => {
      this.textAreaWrapper?.querySelector('textarea')?.focus()
    }, 100)
  }

  handleBlur = (e) => {
    this.props.input.onBlur(e)

    this.setState({
      isEditMode: false,
    })
  }
}
