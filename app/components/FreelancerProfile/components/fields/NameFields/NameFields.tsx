import React from 'react'
import ReactDOM from 'react-dom'
import { IconButton, TextField, Tooltip } from '@material-ui/core'
import { isCypress } from 'services/browserAgent'
import { Tag, TutorialBubble, FocusFadeGroup } from 'components'
import { FormValue } from 'types'
import { cleanName } from 'services/text'
import { Create } from '@material-ui/icons'
import styles from './NameFields.module.css'

const PLACEHOLDER = 'Your Full Name'

interface INameFieldsProps {
  editable?: boolean
  first_name: FormValue<string>
  last_name: FormValue<string>
}

interface INameFieldsState {
  isEditMode: boolean
  fullName: string
  isBubbleShown: boolean
  textFieldOriginWidth: number
}

export default class NameFields extends React.Component<INameFieldsProps, INameFieldsState> {
  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      isEditMode: false,
      fullName: `${props.first_name.input.value} ${props.last_name.input.value}`.trim(),
      isBubbleShown: false,
      textFieldOriginWidth: 0,
    }
  }

  textField: any

  nameWrapperElement: any

  componentDidMount() {
    if (!isCypress()) {
      // hide TutorialBubble during e2e tests
      // it's a simple component and it just makes writing tests very infeasible
      setTimeout(() => {
        this.setState({
          isBubbleShown: true,
        })
      }, 2000)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEditMode && this.state.isEditMode) {
      if (this.textField) {
        let textFieldElement = ReactDOM.findDOMNode(this.textField)

        if (textFieldElement.animate) {
          textFieldElement.animate(
            [
              { maxWidth: `${(this.state.textFieldOriginWidth + 6) || 0}px` },
              { maxWidth: `${textFieldElement.clientWidth || 0}px` },
            ],
            {
              duration: 450,
              easing: 'cubic-bezier(0.6, 0, 0, 1)',
            },
          )
        }
      }
    }
    if (prevProps.first_name.input.value !== this.props.first_name.input.value || prevProps.last_name.input.value !== this.props.last_name.input.value) {
      this.setState({
        fullName: `${this.props.first_name.input.value} ${this.props.last_name.input.value}`.trim(),
      })
    }
  }

  render() {
    const { editable, first_name, last_name } = this.props
    const { fullName, isEditMode, isBubbleShown } = this.state

    const showError = (first_name.meta.touched && first_name.meta.error) || (last_name.meta.touched && last_name.meta.error)

    return (
      <Tag
        className={styles.container}
        onClick={this.handleEditClick}
        style={{
          margin: isEditMode ? '12px 0' : undefined,
          paddingBottom: showError ? 24 : undefined,
        }}
      >
        <FocusFadeGroup focused={isEditMode} style={{ display: 'inline-block' }}>
          {isEditMode && (
            <TextField
              ref={textField => this.textField = textField}
              autoFocus
              value={fullName}
              placeholder={PLACEHOLDER}
              multiline
              rowsMax={4}
              onChange={this.handleFullNameChange}
              onBlur={this.handleBlur}
              className={styles.field}
              inputProps={{
                style: { fontSize: '20px', lineHeight: '20px' },
                'data-cy': 'profile-name-field',
              }}
            />
          )}

          {!isEditMode && (
            <span className={styles.name} style={fullName ? undefined : { opacity: 0.5 }} ref={span => this.nameWrapperElement = span}>
              {fullName || PLACEHOLDER}
            </span>
          )}

          {showError && (
            <div className={styles.error} data-cy="profile-name-error">
              {first_name.meta.error || last_name.meta.error}
            </div>
          )}

          {editable && (
            <TutorialBubble
              active={!fullName && isBubbleShown}
              message="Click the edit button to customize each section."
              style={{ display: 'inline-block' }}
            >
              <Tooltip title="Edit name" placement="top">
                <IconButton data-cy="profile-name-edit" className={styles.edit}>
                  <Create />
                </IconButton>
              </Tooltip>
            </TutorialBubble>
          )}
        </FocusFadeGroup>
      </Tag>
    )
  }

  handleEditClick = () => {
    if (!this.props.editable) return

    this.setState(state => ({
      textFieldOriginWidth: this.nameWrapperElement ? this.nameWrapperElement.clientWidth : state.textFieldOriginWidth,
      isEditMode: true,
    }))
  }

  handleBlur = (e) => {
    // eslint-disable-next-line camelcase
    const { first_name, last_name } = this.props
    const fullName = cleanName(this.state.fullName)
    const delimiterIndex = fullName.indexOf(' ')
    const nameParts = delimiterIndex === -1 ? [fullName] : [fullName.substring(0, delimiterIndex), fullName.substring(delimiterIndex + 1)]

    const firstNameValue = nameParts[0] || ''
    const lastNameValue = nameParts[1] || ''

    const firstNameChanged = (first_name.input.value || '') !== firstNameValue
    const lastNameChanged = (last_name.input.value || '') !== lastNameValue

    if (firstNameChanged) {
      first_name.input.onBlur(e)
      first_name.input.onChange(firstNameValue)
    }

    if (lastNameChanged) {
      last_name.input.onBlur(e)
      last_name.input.onChange(lastNameValue)
    }

    this.setState({
      isEditMode: false,
      fullName: `${firstNameValue} ${lastNameValue}`.trim(),
    })
  }

  handleFullNameChange = (e) => {
    this.setState({
      fullName: e.target.value,
    })
  }
}
