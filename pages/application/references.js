import { withLayout } from 'withLayout'
import { withScreeningLayout } from 'scenes/Screening'
import { References } from 'scenes/Screening/References'

export default withLayout(withScreeningLayout(References), { name: 'References' })
