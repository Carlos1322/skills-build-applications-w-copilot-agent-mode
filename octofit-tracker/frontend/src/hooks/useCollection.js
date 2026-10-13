import { useEffect, useState } from 'react'

export default function useCollection(endpoint, fetchCollection) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const collection = await fetchCollection(endpoint, { signal: controller.signal })
        setItems(collection)
      } catch (requestError) {
        if (!controller.signal.aborted) {
          setError(requestError instanceof Error ? requestError.message : 'Unable to load data.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadCollection()

    return () => controller.abort()
  }, [endpoint, fetchCollection])

  return { items, error, loading }
}
