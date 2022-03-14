import watchLogout from 'sagas/auth/Logout'
import watchSetupAuth from 'sagas/auth/SetupAuth'
import watchProviderAuthStart from 'sagas/auth/ProviderAuth'
import watchSignup from 'scenes/Signup/SignupSaga'
import watchLogin from 'scenes/Login/LoginSaga'
import watchConfirmEmail from 'scenes/ConfirmEmail/ConfirmEmailSaga'
import watchPasswordSetup from 'scenes/PasswordSetup/PasswordSetupSaga'
import watchForgotPassword from 'sagas/auth/ForgotPassword'
import watchChangePassword from 'sagas/auth/ChangePassword'
import watchCurrentUser from 'sagas/__helpers/getCurrentUser'

const sagas = [
  watchLogout(),
  watchSetupAuth(),
  watchProviderAuthStart(),
  watchSignup(),
  watchLogin(),
  watchConfirmEmail(),
  watchPasswordSetup(),
  watchForgotPassword(),
  watchChangePassword(),
  watchCurrentUser(),
]

export default sagas
