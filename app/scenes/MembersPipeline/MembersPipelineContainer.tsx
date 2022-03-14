import { PageBundlePlaceholder, Suspense } from 'components'
import MembersPipeline from './MembersPipeline'

const MembersPipelineContainer = () => <Suspense fallback={PageBundlePlaceholder}><MembersPipeline /></Suspense>

export default MembersPipelineContainer
