import { useEffect, useRef, useState } from 'react'
import { claimDrop } from '../services/claimService'

export function useOptimisticClaim(initialStock) {
  const [stock, setStock] = useState(initialStock)
  const [isClaiming, setIsClaiming] = useState(false)
  const [message, setMessage] = useState('')
  const [claimStatus, setClaimStatus] = useState('idle')

  const inFlightRef = useRef(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  const claim = async (dropId, scenario = 'success') => {
    if (inFlightRef.current !== null || stock <= 0) {
      return
    }

    const claimId = crypto.randomUUID()

    // Synchronous lock prevents duplicate requests.
    inFlightRef.current = claimId

    // Optimistic stock deduction.
    setStock((previous) => previous - 1)
    setIsClaiming(true)
    setClaimStatus('pending')
    setMessage('Securing your loot...')

    try {
      await claimDrop({ dropId, claimId, scenario })

      if (!mountedRef.current) return

      setClaimStatus('success')
      setMessage('Claim successful! Loot secured.')
    } catch (error) {
      if (!mountedRef.current) return

      // Restore exactly one reserved item.
      setStock((previous) => previous + 1)

      setClaimStatus('error')

      if (error.status === 409) {
        setMessage('409 Conflict: Loot unavailable. Stock restored.')
      } else {
        setMessage('Claim failed. Inventory rolled back.')
      }
    } finally {
      if (inFlightRef.current === claimId) {
        inFlightRef.current = null
      }

      if (mountedRef.current) {
        setIsClaiming(false)
      }
    }
  }

  return {
    stock,
    isClaiming,
    claimStatus,
    message,
    claim,
  }
}