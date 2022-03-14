import watchApplication from './ScreeningFinalStep/ApplicationSaga'
import { watchSubmitReference, watchDeleteReference } from './References/components/ReferenceForm/ReferenceFormSaga'
import watchGiveReference from './References/components/GiveReference/GiveReferenceSaga'
import watchReviewProfile from './Review/ReviewSaga'

const screeningSagas = [
  watchApplication(),
  watchSubmitReference(),
  watchDeleteReference(),
  watchGiveReference(),
  watchReviewProfile(),
]

export default screeningSagas
