import { all } from 'redux-saga/effects'
import watchSubmitCompanyForm from './SubmitCompanyFormSaga'
import watchSubmitAccountForm from './SubmitAccountFormSaga'
import watchDeleteAccount from './DeleteAccountSaga'

export default function* watch() {
  yield all([
    watchSubmitCompanyForm(),
    watchSubmitAccountForm(),
    watchDeleteAccount(),
  ])
}
