import React from 'react'
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Grid,
  Checkbox,
  FormControlLabel,
  DialogContentText,
  Divider,
  Collapse,
  Tooltip,
  ListItemIcon,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import { pull, debounce } from 'lodash'
import { trackError } from 'services/analytics'
import { getAPIClient } from 'api'
import { setFieldToEventValue } from 'services/stateManagement'
import { InfoMessage, LoadingIcon, ResponsiveDialog, ResponsiveButton } from 'components'
import PagePagination from 'components/PagePagination/PagePagination'
import { IFreelancerType, ISkill, IFreelancerSubtype, IQuestion } from 'types'
import { TextField } from 'components/themed'
import { Tune } from '@material-ui/icons'
import { ContainerProps } from './ExistingQuestionsDialogContainer'
import styles from './ExistingQuestionsDialog.module.css'

const QUESTIONS_PER_PAGE = 5

interface IExistingQuestionsDialogProps extends ContainerProps {
  questionTitle?: string
  freelancerTypes?: IFreelancerType[]
  freelancerSubtypes?: IFreelancerSubtype[]
  selectedFreelancerSubtypeIds?: number[]
  questions: Pick<IQuestion, 'id'>[]
  skills?: ISkill[]
  onClose: () => void
  addQuestion: (question: Pick<IQuestion, 'id' | 'title'>) => void
  removeQuestion: (question: Pick<IQuestion, 'id' | 'title'>) => void
  open: boolean
  dialogTitle?: string
  dialogDescription?: string
  noFiltersMessage?: string
  doneButtonMessage?: string
}

interface IExistingQuestionsDialogState {
  results: IQuestion[]
  resultsReceived: boolean
  title: string
  freelancer_type_ids: number[]
  freelancer_subtype_ids: number[]
  skill_ids: number[]
  count: number
  page: number
  isFilterRowOpen: boolean
}

class ExistingQuestionsDialog extends React.Component<IExistingQuestionsDialogProps, IExistingQuestionsDialogState> {
  state = {
    results: [],
    resultsReceived: false,
    title: '',
    freelancer_type_ids: [],
    freelancer_subtype_ids: [],
    skill_ids: [],
    count: 0,
    page: 0,
    isFilterRowOpen: null,
  }

  componentDidMount() {
    // TODO: move this to constructor to avoid duplicate rendering on mount
    const { questionTitle } = this.props
    const initialState = questionTitle ? { title: questionTitle } : this.getDefaultFilters()
    this.setState(initialState as any, this.refresh)
  }

  refresh = debounce(async () => {
    const { showSnackbarMessage, freelancerTypes = [], freelancerSubtypes = [], skills = [] } = this.props
    const { title, freelancer_type_ids, freelancer_subtype_ids, skill_ids, page, isFilterRowOpen } = this.state

    this.setState({
      resultsReceived: false,
    })

    try {
      const response = await getAPIClient().getQuestions({
        title,
        freelancer_type_ids: freelancerTypes.filter(x => freelancer_type_ids.includes(x.id)).map(x => x.id),
        freelancer_subtype_ids: freelancerSubtypes.filter(x => freelancer_subtype_ids.includes(x.id)).map(x => x.id),
        skill_ids: skills.filter(x => skill_ids.includes(x.id)).map(x => x.id),
        per_page: QUESTIONS_PER_PAGE,
        page: page + 1,
      })

      this.setState({
        results: response.body,
        count: response.headers.totalCount,
        resultsReceived: true,
        // If the filters are closed and have never been open, open them now
        isFilterRowOpen: isFilterRowOpen === null ? true : isFilterRowOpen,
      })
    } catch (err) {
      trackError(err)
      showSnackbarMessage('Could not fetch Questions')
    }
  }, 200)

  render() {
    const {
      onClose,
      open,
      questions = [],
      freelancerTypes = [],
      freelancerSubtypes = [],
      skills = [],
      dialogTitle = 'Choose Existing Questions',
      dialogDescription = 'Choose an existing Question to add to this Job Posting',
      noFiltersMessage = 'No filters available',
      doneButtonMessage = 'Done',
    } = this.props

    const {
      results,
      resultsReceived,
      title,
      freelancer_subtype_ids,
      freelancer_type_ids,
      skill_ids,
      page,
      count,
      isFilterRowOpen,
    } = this.state

    const ids = questions.map(q => q.id).filter(id => id > 0)
    const noFilters = (freelancerTypes.length + freelancerSubtypes.length + skills.length) === 0
    const noSkills = skills.length === 0

    return (
      <ResponsiveDialog open={open} onClose={onClose} maxWidth="md" data-cy="existing-questions-dialog">
        <div style={{ width: 9999 }} />

        {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}

        <DialogContent>
          {dialogDescription && (
            <DialogContentText>
              {dialogDescription}
            </DialogContentText>
          )}

          <TextField
            autoFocus
            label="Search by keyword"
            value={title}
            onChange={this.updateTitleFilter}
            name="question-search"
            fullWidth
            endAdornment={(
              <Tooltip title="Filter results">
                <IconButton edge="end" onClick={this.handleFilterRowToggle}>
                  <Tune />
                </IconButton>
              </Tooltip>
            )}
          />

          <Collapse in={isFilterRowOpen} className={styles['filters-row']}>
            {noFilters && (
              <InfoMessage>
                {noFiltersMessage}
              </InfoMessage>
            )}

            {!noFilters && (
              <Grid container>
                <Grid item xs={12} md={6}>
                  {freelancerTypes.map(v => (
                    <FormControlLabel
                      key={v.id}
                      control={(
                        <Checkbox
                          color="primary"
                          checked={freelancer_type_ids.indexOf(v.id) >= 0}
                          onChange={this.onCheckboxChange('freelancer_type_ids', v.id)}
                          data-cy={`checkbox-freelancer_type-${v.name}`}
                        />
                      )}
                      label={v.name}
                    />
                  ))}

                  {freelancerSubtypes.length > 0 && (
                    <React.Fragment>
                      <Divider />

                      {freelancerSubtypes.map(v => (
                        <FormControlLabel
                          key={v.id}
                          control={(
                            <Checkbox
                              color="primary"
                              checked={freelancer_subtype_ids.indexOf(v.id) >= 0}
                              onChange={this.onCheckboxChange('freelancer_subtype_ids', v.id)}
                              data-cy={`checkbox-freelancer_subtype-${v.name}`}
                            />
                          )}
                          label={v.name}
                        />
                      ))}
                    </React.Fragment>
                  )}
                </Grid>

                <Grid item xs={12} md={6}>
                  {noSkills && (
                    <InfoMessage>Choose one or more Skills for your Job to unlock skill filtering options</InfoMessage>
                  )}

                  {skills.map(v => (
                    <FormControlLabel
                      key={v.id}
                      control={(
                        <Checkbox
                          color="primary"
                          checked={skill_ids.indexOf(v.id) >= 0}
                          onChange={this.onCheckboxChange('skill_ids', v.id)}
                          data-cy={`checkbox-skill-${v.name}`}
                        />
                      )}
                      label={v.name}
                    />
                  ))}
                </Grid>
              </Grid>
            )}
          </Collapse>

          <Collapse in={!resultsReceived && results.length === 0}>
            <List>
              <ListItem>
                <ListItemIcon>
                  <LoadingIcon />
                </ListItemIcon>

                <ListItemText secondary="Loading..." />
              </ListItem>
            </List>
          </Collapse>

          <Collapse in={resultsReceived || results.length > 0}>
            <List>
              {results.map((q, i) => (
                <ListItem
                  key={q.id}
                  data-cy={`result-${i}`}
                  data-cy-picked={ids.indexOf(q.id) >= 0 ? 'true' : 'false'}
                  data-cy-title={q.title}
                  className={styles['question-item']}
                  style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}
                >
                  <ListItemText
                    primary={q.title}
                    secondary={this.renderQuestionInfo(q)}
                  />

                  <ListItemSecondaryAction>
                    {ids.indexOf(q.id) >= 0 && (
                      <ResponsiveButton
                        onClick={() => this.handleRemoveQuestion(q)}
                        icon={<DeleteIcon />}
                        data-cy={`result-${i}-action`}
                      />
                    )}

                    {ids.indexOf(q.id) === -1 && (
                      <ResponsiveButton
                        onClick={() => this.handleAddQuestion(q)}
                        color="primary"
                        data-cy={`result-${i}-action`}
                        icon={<AddIcon />}
                      />
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}

              {results.length === 0 && (
                <ListItem>
                  <ListItemText secondary="No results" />
                </ListItem>
              )}
            </List>
          </Collapse>

          <PagePagination
            page={page}
            rowsPerPage={QUESTIONS_PER_PAGE}
            count={count}
            onPageChange={this.onPageChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} data-cy="done">
            {doneButtonMessage}
          </Button>
        </DialogActions>
      </ResponsiveDialog>
    )
  }

  renderQuestionInfo(question) {
    return (
      <span className={styles.tags}>
        <span>{question.answers_count} answer(s)</span>
        {question.freelancer_types.map(s => <span key={s.id}>{s.name}</span>)}
        {question.freelancer_subtypes.map(s => <span key={s.id}>{s.name}</span>)}
        {question.skills.map(s => <span key={s.id}>{s.name}</span>)}
      </span>
    )
  }

  onCheckboxChange = (field: string, id: number) => () => {
    const values = this.state[field]

    if (values.indexOf(id) >= 0) {
      this.setState({ [field]: pull(values, id) } as any, this.refresh)
    } else {
      this.setState({ [field]: values.concat(id) } as any, this.refresh)
    }
  }

  updateTitleFilter = setFieldToEventValue('title', this.refresh.bind(this)).bind(this)

  onPageChange = page => this.setState({ page }, this.refresh)

  handleAddQuestion = (q) => {
    const { showSnackbarMessage, addQuestion } = this.props

    addQuestion(q)
    showSnackbarMessage('Question added')
  }

  handleRemoveQuestion = (q) => {
    const { showSnackbarMessage, removeQuestion } = this.props

    removeQuestion(q)
    showSnackbarMessage('Question removed')
  }

  getDefaultFilters = () => {
    const { freelancerTypes = [], skills = [], selectedFreelancerSubtypeIds = [] } = this.props
    return {
      freelancer_type_ids: freelancerTypes.map(r => r.id),
      freelancer_subtype_ids: selectedFreelancerSubtypeIds,
      skill_ids: skills.map(r => r.id),
    }
  }

  handleFilterRowToggle = () => {
    this.setState((state) => {
      const update = {
        isFilterRowOpen: !state.isFilterRowOpen,
      }
      if (state.isFilterRowOpen === null) {
        // If the filters have never been open, then set the default filters
        return { ...update, ...this.getDefaultFilters() }
      }
      return update
    })
  }
}

export default ExistingQuestionsDialog
