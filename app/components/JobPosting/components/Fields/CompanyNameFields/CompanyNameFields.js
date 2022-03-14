import React from 'react'
import { IconButton, Tooltip, TextField } from '@material-ui/core'
import { FocusFadeGroup, ExternalLink } from 'components'
import { Create } from '@material-ui/icons'
import FormErrorHint from '../../FormErrorHint'
import styles from './CompanyNameFields.module.css'

export default class CompanyNameFields extends React.PureComponent {
  static defaultProps = {
    meta: {},
  }

  state = {
    isEditorOpen: false,
  }

  componentDidMount() {
    this.forceUpdate()
  }

  render() {
    const { company_name: { input }, meta, editable, label } = this.props
    const { isEditorOpen } = this.state

    if (!input.value && !editable) {
      return null
    }

    return (
      <FocusFadeGroup focused={isEditorOpen}>
        <div className={styles.container} ref={div => this.container = div}>
          {!isEditorOpen && (
            <div ref={div => this.previewWrapper = div}>
              <div style={{ marginRight: 12, display: 'inline-block' }}>
                About {this.renderCompanyName()}
              </div>

              {editable && (
                <Tooltip title="Edit this section" placement="right">
                  <IconButton onClick={this.handleDialogOpenToggle} className={styles['icon-button']} data-cy={`job-${input.name}-open`}>
                    <Create />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          )}

          {isEditorOpen && (
            <div>
              <TextField
                autoFocus
                value={input.value}
                onChange={input.onChange}
                onBlur={this.handleTextAreaBlur}
                label={label}
                placeholder="Company name"
                className={styles.input}
                data-cy={`job-${input.name}-input`}
              />
            </div>
          )}

          {(!isEditorOpen) && (
            <FormErrorHint message={meta.touched && meta.error} />
          )}
        </div>
      </FocusFadeGroup>
    )
  }

  renderCompanyName() {
    // eslint-disable-next-line camelcase
    const { company_name, company_website } = this.props
    const label = company_name?.input?.value || (
      <span className={styles.placeholder}>my company</span>
    )

    if (company_website?.input?.value) {
      return (
        <ExternalLink
          href={company_website?.input?.value}
          label={label}
        />
      )
    }

    return label
  }

  handleTextAreaBlur = (e) => {
    this.props.company_name.input.onBlur(e)
    this.closeEditor()
  }

  handleDialogOpenToggle = () => {
    if (this.state.isEditorOpen) {
      this.closeEditor()
    } else {
      if (this.previewWrapper) {
        this.previewWrapperHeight = this.previewWrapper.clientHeight
      }

      this.setState({
        isEditorOpen: true,
      })
    }
  }

  closeEditor() {
    this.setState({
      isEditorOpen: false,
    })
  }
}
