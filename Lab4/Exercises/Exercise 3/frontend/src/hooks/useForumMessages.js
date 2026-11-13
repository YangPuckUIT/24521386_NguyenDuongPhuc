import { useEffect, useState } from 'react'
import { fetchMessages } from '../services/forumApi'

export function useForumMessages(channel) {
  const [query, setQuery] = useState({ channel, version: 0 })
  // Invalidate cached results during render, before a changed channel can paint.
  if (query.channel !== channel) setQuery({ channel, version: query.version + 1 })
  const { version } = query
  const [result, setResult] = useState(null)
  useEffect(() => {
    if (!channel) return
    const controller = new AbortController()
    fetchMessages(channel, controller.signal).then(
      (data) => {
        if (!controller.signal.aborted) setResult({ channel, version, status: 'success', messages: data.messages, error: null })
      },
      (error) => {
        if (!controller.signal.aborted) setResult({ channel, version, status: 'error', messages: [], error: error.message })
      },
    )
    return () => controller.abort()
  }, [channel, version])
  const visible = result?.channel === channel && result.version === version
    ? result : { status: channel ? 'loading' : 'idle', messages: [], error: null }
  return { ...visible, refresh: () => setQuery((value) => ({ ...value, version: value.version + 1 })) }
}
