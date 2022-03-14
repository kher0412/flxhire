import moment from 'moment'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'reducers'
import { reduxForm, InjectedFormProps, formValueSelector } from 'redux-form'
import GrantBonusForm, { IGrantBonusFormPayload, IGrantBonusFormProps } from './GrantBonusForm'

export const FORM_NAME = 'editGrantBonusForm'

const grantBonusForm = {
  form: 'grantBonusForm',
  validate: (values: IGrantBonusFormPayload) => {
    const errors = {} as { [key: string]: string }

    if (!values.contractId) {
      errors.contractId = 'Required'
    }

    if (!values.clientAmount) {
      errors.clientAmount = 'Required'
    }

    if (values.endDate && values.startDate && !moment(values.endDate).isAfter(moment(values.startDate))) {
      errors.endDate = 'Must be after period start'
    }

    return errors
  },
  enableReinitialize: true,
}

const mapStateToProps = (state: RootState) => {
  return {
    contractIdFieldValue: formValueSelector(grantBonusForm.form)(state, 'contractId'),
  }
}

const connector = connect<any, any, IGrantBonusFormProps>(mapStateToProps)

export type IGrantBonusFormContainerProps = InjectedFormProps<IGrantBonusFormPayload, IGrantBonusFormProps> & ConnectedProps<typeof connector>

const GrantBonusFormContainer = connector(reduxForm<IGrantBonusFormPayload, IGrantBonusFormProps>(grantBonusForm)(GrantBonusForm))

export default GrantBonusFormContainer
