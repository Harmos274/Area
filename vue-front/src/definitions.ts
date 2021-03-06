function getBaseApiUrl (): string {
  const host = process.env.VUE_APP_API_HOST
  const port = process.env.VUE_APP_API_PORT

  if (host && port) {
    return `http://${host}:${port}`
  } else {
    return 'http://localhost:5000'
  }
}

function getBaseSelfUrl (): string {
  const host = process.env.VUE_APP_HOST
  const port = process.env.VUE_APP_PORT

  if (host && port) {
    return `http://${host}:${port}`
  } else {
    return 'http://localhost:8080'
  }
}

export const baseApiUrl = getBaseApiUrl()
export const baseSelfUrl = getBaseSelfUrl()

export const stateString = process.env.VUE_APP_SERVICES_STATE || 'croacroa'

export const avatar_fallback_url = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
