import { INextPageContext } from 'types/next'
import { setReferer as setRefererAction } from 'reducers/Tracking'
import storage from './localStorage'

const LOCAL_STORAGE_KEY_REFERER = 'flexhire_referer'
const LOCAL_STORAGE_KEY_REF = 'flexhire_ref'

export function setRefererFromCtx(ctx: INextPageContext) {
  const referer = ctx.req?.headers?.referer
  if (referer) ctx.store.dispatch(setRefererAction({ referer }))
}

export function getRefererFromDocument() {
  return document.referrer || null
}

export function storeRefererInfo(referer: string) {
  if (referer) storage.setItem(LOCAL_STORAGE_KEY_REFERER, referer)
}

export function storeRefInfo(ref: string) {
  if (ref) storage.setItem(LOCAL_STORAGE_KEY_REF, ref)
}

export function getRefererInfo() {
  return storage.getItem(LOCAL_STORAGE_KEY_REFERER)
}

export function getRefInfo() {
  return storage.getItem(LOCAL_STORAGE_KEY_REF)
}

export function trackTimeSincePageLoad(name: string) {
  try {
    const perf = window?.performance?.now()
    if (perf) {
      const w = window as any
      if (w.gtag) {
        w.gtag('event', 'timing_complete', {
          name,
          value: Math.round(perf),
        })
      }
    }
  } catch (error) {
    console.log(error)
  }
}
