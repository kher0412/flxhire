import { combineReducers } from 'redux'
import review from './Review/ReviewDucks'
import references from './References/components/References/ReferencesDucks'
import referenceForm from './References/components/ReferenceForm/ReferenceFormDucks'
import giveReference from './References/components/GiveReference/GiveReferenceDucks'
import application from './ScreeningFinalStep/ApplicationDucks'

const screeningReducers = combineReducers({
  review,
  references,
  referenceForm,
  giveReference,
  application,
})

export default screeningReducers
