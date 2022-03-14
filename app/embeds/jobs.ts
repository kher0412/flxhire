import { isPrerendering } from 'services/prerender'

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Script used by clients to embed jobs listing on their site
// It is emitted as a separate bundle, and runs on the embedder's website
//
// NOTE: this script is not built with the rest of the application.
// Use 'npm run build-embed-scripts' to build it.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

(() => {
  if (isPrerendering()) return

  const scriptElem = document.currentScript
  const firmSlug = scriptElem.dataset.company
  const showVideo = scriptElem.dataset.video || 'false'
  const showText = scriptElem.dataset.text || 'false'
  const iframeElem = document.createElement('iframe')

  window.addEventListener('load', () => {
    window.addEventListener('message', (e) => {
      if (Number.isFinite(e.data) && e.data > 0) {
        iframeElem.style.height = `${e.data}px`
      }
    })

    // guesstimate dominant color from anchors
    let anchorRefs = document.getElementsByTagName('a')
    let anchorColors = new Map<string, number>()
    let anchorColorDominant = ''
    let anchorColorDominantCount = 0

    for (let i = 0; i < anchorRefs.length; i++) {
      let color = window.getComputedStyle(anchorRefs[i]).color
      anchorColors.set(color, (anchorColors.get(color) || 0) + 1)
    }

    for (let [color, count] of Array.from(anchorColors)) {
      if (count > anchorColorDominantCount) {
        anchorColorDominant = color
        anchorColorDominantCount = count
      }
    }

    iframeElem.style.width = '100%'
    iframeElem.style.height = '200px' // initial height
    iframeElem.style.transition = 'height 0.4s ease'
    iframeElem.style.borderRadius = '6px'
    iframeElem.src = `${process.env.ROOT_URL}/${firmSlug}?layout=false&video=${showVideo}&text=${showText}&color=${anchorColorDominant}`

    scriptElem.parentElement.insertBefore(iframeElem, scriptElem)
  })
})()
