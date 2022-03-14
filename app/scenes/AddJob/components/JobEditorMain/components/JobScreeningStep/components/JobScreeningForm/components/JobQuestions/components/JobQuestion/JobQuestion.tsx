import React from 'react'
import ReactDOM from 'react-dom'
import { IconButton, MenuItem } from '@material-ui/core'
import { ConfirmButton, MoreButtonMenu } from 'components'
import { TextField } from 'components/themed'
import { CheckCircle, Delete } from '@material-ui/icons'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import { IQuestionUpdateNode } from 'types'
import styles from './JobQuestion.module.css'
import { QuestionType } from '../../../../JobScreeningFormContainer'

const HIDDEN_BUTTON_STYLE = {
  // We need the confirm dialogs but not the buttons to be visible
  // so for now we do this until we have dedicated ConfirmDialogs
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  minHeight: 0,
  minWidth: 0,
  overflow: 'hidden',
  display: 'none',
}

const MAX_DURATION_RANGE = [1, 2, 3, 4, 5]

interface IJobQuestionProps {
  sticky?: boolean
  index: number
  onChange?: (q: IQuestionUpdateNode) => void
  question?: Partial<QuestionType>
  onFocusNext?: () => void
  onRemove?: () => void
  disabled?: boolean
}

interface IJobQuestionState {
  questionTitle: string
  maxDuration: number
}

export default class JobQuestion extends React.PureComponent<IJobQuestionProps, IJobQuestionState> {
  removeButton: any

  changeButton: any

  constructor(props, ctx) {
    super(props, ctx)

    this.state = {
      questionTitle: props.question?.title || '',
      maxDuration: props.question?.maxDuration,
    }
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props
    const { questionTitle, maxDuration } = this.state

    const questionChanged = question?.title !== prevProps.question?.title
    const maxDurationChanged = question?.maxDuration !== prevProps.question?.maxDuration

    // Note: if question is undefined the condition should stay false
    if (question && question.title !== questionTitle && questionChanged) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        questionTitle: question.title,
      })
    }

    if (question && question.maxDuration !== maxDuration && maxDurationChanged) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        maxDuration: question.maxDuration,
      })
    }
  }

  render() {
    const { sticky, question, index, disabled } = this.props
    const { questionTitle } = this.state

    return (
      <div className={styles.container} data-cy={`job-question-${index}`}>
        {!disabled && (
          <MoreButtonMenu
            label={<AccessTimeIcon className={styles['button-icon']} />}
            data-cy="max-duration-menu"
            style={{ background: 'none', padding: 0 }}
            disabled={question?.status === 'public'}
          >
            {MAX_DURATION_RANGE.map((maxDuration) => {
              return (
                <MenuItem onClick={() => this.handleMaxDuration(maxDuration)} data-cy="max-duration-range">
                  {maxDuration} minute
                </MenuItem>
              )
            })}
          </MoreButtonMenu>
        )}

        <div className={styles.input}>
          <TextField
            data-cy={`textfield-input-questions[${index}].title`}
            fullWidth
            disabled={disabled}
            value={questionTitle}
            placeholder="Enter new question..."
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyDown}
            helperText={this.getAnswerCountText()}
            endAdornment={questionTitle && !disabled ? (
              <IconButton size="small" onClick={this.handleRemoveButtonClick}>
                <Delete />
              </IconButton>
            ) : undefined}
          />
        </div>

        <div className={styles['secondary-actions']}>
          {questionTitle && sticky && (
            // No need to do anything on button click, as it will cause the above input to be blurred, which saves the new data.
            <IconButton className={styles['add-button']}>
              <CheckCircle />
            </IconButton>
          )}

          <ConfirmButton
            style={HIDDEN_BUTTON_STYLE}
            ref={button => this.changeButton = button}
            onClick={this.handleChangeButtonClick}
            onCancel={this.handleButtonCancel}
            dialogMessage={question?.status !== 'private' ? [
              'This is a pre-existing Question on Flexhire.',
              `Changing the title will replace the "${question?.title}" pre-existing Question with the "${questionTitle}" Custom Question on this Job.`,
              'Continue?',
            ].join(' ') : `Change question from "${question?.title}" to "${questionTitle}"?`}
          />

          <ConfirmButton
            style={HIDDEN_BUTTON_STYLE}
            ref={button => this.removeButton = button}
            onClick={this.removeQuestion}
            onCancel={this.handleButtonCancel}
            dialogMessage="Remove this question from the job?"
          />
        </div>
      </div>
    )
  }

  handleChange = (e) => {
    this.setState({
      questionTitle: e.target.value,
    })
  }

  handleKeyDown = (e) => {
    const { onFocusNext } = this.props

    if (e.key === 'Enter') {
      e.stopPropagation()
      this.handleBlur()

      window.requestAnimationFrame(() => {
        if (onFocusNext) {
          onFocusNext()
        }
      })
    }
  }

  handleBlur = () => {
    const { question, sticky } = this.props
    const { questionTitle } = this.state

    if (questionTitle !== question?.title) {
      if (questionTitle) {
        if (question?.answersCount > 0 || question?.jobsCount > 1 || (question?.status && question?.status !== 'private')) {
          // Use a hidden ConfirmButton to trigger a dialog before committing change.
          ReactDOM.findDOMNode(this.changeButton).click()
        } else {
          this.handleChangeButtonClick()
        }
      } else if (!sticky) {
        this.handleRemoveButtonClick()
      }
    }
  }

  handleChangeButtonClick = () => {
    const { onChange, question } = this.props
    const { questionTitle, maxDuration } = this.state

    if (onChange) {
      onChange({
        title: questionTitle,
        rawId: question.rawId,
        description: question.description,
        status: question.status,
        answersCount: question.answersCount,
        maxDuration: maxDuration,
      })
    }
  }

  handleRemoveButtonClick = () => {
    const { sticky } = this.props

    if (sticky) return

    // Use a hidden ConfirmButton to trigger a dialog before removing.
    ReactDOM.findDOMNode(this.removeButton).click()
  }

  removeQuestion = () => {
    const { onRemove, sticky } = this.props

    if (!sticky) {
      onRemove()
    }
  }

  handleButtonCancel = () => {
    const { question } = this.props

    this.setState({
      questionTitle: question?.title,
    })
  }

  handleMaxDuration = (maxDuration: number) => {
    const { onChange, question } = this.props
    const { questionTitle } = this.state

    if (onChange) {
      onChange({
        title: questionTitle,
        rawId: question.rawId,
        description: question.description,
        status: question.status,
        answersCount: question.answersCount,
        maxDuration: maxDuration,
      })
    }

    this.setState({
      maxDuration: maxDuration,
    })
  }

  getAnswerCountText() {
    const { question, disabled } = this.props
    let newMaxDuration = 0

    if (!question) return null

    let text = ''
    if (!disabled) {
      if (this.state.maxDuration) {
        newMaxDuration = this.state.maxDuration
      } else {
        newMaxDuration = question.maxDuration
      }

      text += `max answer: ${newMaxDuration} minute(s) | `
    }

    if (question.title && question.title.length > 0) {
      text += question.rawId > 0 ? 'Existing Question' : 'Custom Question'
    }

    if (question.answersCount === 1) {
      text += ' | 1 video answer'
    }

    if (question.answersCount > 1) {
      text += ` | ${question.answersCount} video answers`
    }

    return (
      <div className={styles['helper-text']}>
        {text}
      </div>
    )
  }

  getAnswerCountTextRaw() {
    const { question } = this.props

    if (!question) return null

    if (question.answersCount === 1) {
      return '1 answer'
    }

    if (question.answersCount > 1) {
      return `${question.answersCount} answers`
    }

    return null
  }
}
