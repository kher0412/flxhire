export function loadScript(src: string) {
  return new Promise((resolve) => {
    // Look for existing script and return it if found
    const scripts: any = document.getElementsByTagName('script')
    for (const script of scripts) {
      if (script.getAttribute('src') === src) {
        resolve(script)
        return
      }
    }
    // Existing script not found, create script
    const script = document.createElement('script')
    script.onload = () => resolve(script) // resolve promise when script onload is fired
    script.src = src
    script.async = false
    document.body.appendChild(script)
  })
}
