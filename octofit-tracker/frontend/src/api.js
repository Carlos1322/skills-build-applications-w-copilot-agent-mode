const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function collectionFrom(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === 'object') {
    for (const key of ['results', 'items', 'data']) {
      if (Array.isArray(payload[key])) {
        return payload[key]
      }
      if (payload[key] && typeof payload[key] === 'object') {
        const nested = collectionFrom(payload[key])
        if (nested) {
          return nested
        }
      }
    }
  }

  return null
}

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Request failed (${response.status} ${response.statusText})`)
  }

  const payload = await response.json()
  const collection = collectionFrom(payload)

  if (!collection) {
    throw new Error('The API returned an unsupported collection response.')
  }

  return collection
}

export { fetchCollection as fetch }
