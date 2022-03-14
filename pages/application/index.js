import { withLayout } from 'withLayout'
import { withScreeningLayout } from 'scenes/Screening'
import ApplicationRedirector from 'scenes/Screening/components/ApplicationRedirector'

export default withLayout(withScreeningLayout(ApplicationRedirector), { name: 'Profile' })
