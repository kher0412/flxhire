import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { extractQueryParams } from 'services/router'

export function useQueryParams() {
  const router = useRouter()
  const query = useMemo(() => extractQueryParams(router?.asPath), [router?.asPath])
  return query
}
