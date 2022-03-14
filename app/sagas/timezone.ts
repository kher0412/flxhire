import { select, call, put, throttle } from 'redux-saga/effects'
import { setCurrentUser, SET_CURRENT_USER } from 'reducers/Auth'
import { REFRESH_TIMEZONE } from 'reducers/Common'
import { RootState } from 'reducers'
import { ICurrentUser } from 'types'
import { detectTimezoneName, detectTimezoneOffset } from 'services/timeKeeping'
import { getAPIClient } from 'api'
import { isCypress } from 'services/browserAgent'
import { isGuest, isMasked, isMember } from 'services/user'
import { isNumber } from 'services/numbers'

function* performDetectAndSaveTimezone() {
  const user: ICurrentUser = yield select((state: RootState) => state.auth.currentUser)
  // This behavior messes with Cypress test data, so we disable it in cypress
  // This behavior must be disabled when masked into another user.
  if (!isGuest(user) && !isCypress() && !isMasked(user)) {
    const payload = {
      timezone_offset: detectTimezoneOffset(),
      timezone_name: detectTimezoneName(),
    }
    const valuesValid = isNumber(payload.timezone_offset) && payload.timezone_name
    const valuesDifferent = user.timezone_offset !== payload.timezone_offset && user.timezone_name !== payload.timezone_name
    if (valuesValid && valuesDifferent) {
      let currentUser = yield call([getAPIClient(), 'updateUser'], user.id, payload)
      yield put(setCurrentUser({ currentUser }))
    }
  }
}

export default function* watchTimezone() {
  yield throttle(120000, [REFRESH_TIMEZONE, SET_CURRENT_USER], performDetectAndSaveTimezone)
}
