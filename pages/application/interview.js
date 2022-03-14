import { withLayout } from 'withLayout'
import { withScreeningLayout } from 'scenes/Screening'
import { ScreeningFinalStep } from 'scenes/Screening/ScreeningFinalStep'

export default withLayout(withScreeningLayout(ScreeningFinalStep), { name: 'ScreeningFinalStep' })
