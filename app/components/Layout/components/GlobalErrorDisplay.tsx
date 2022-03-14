import { PagePlaceholder } from 'components'

export default function GlobalErrorDisplay({ globalError }: { globalError: string }) {
  return <PagePlaceholder flat title="Service Unavailable" subtitle={globalError} />
}
