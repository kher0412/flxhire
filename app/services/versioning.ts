import { getAPIClient } from 'api'

export function getBuildID() {
  return process.env.FRONTEND_BUILD_ID
}

export async function registerFrontendVersion() {
  const buildId = getBuildID()
  const key = process.env.REGISTER_FRONTEND_VERSION_KEY
  console.log(`Checking Build ID for registering... using Build ID ${buildId} and key ${key}`)
  if (buildId && key) {
    console.log(`Registering Build ID: ${buildId} with backend`)
    await getAPIClient().registerFrontendVersion(buildId, key)
    console.log(`Build ID: ${buildId} registered`)
  } else {
    console.log('Build ID registration skipped')
  }
}
