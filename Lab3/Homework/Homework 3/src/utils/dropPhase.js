export const DROP_PHASE = Object.freeze({
  WARMUP: 'WARMUP',
  AIRDROP_LIVE: 'AIRDROP_LIVE',
  LOOTED_OUT: 'LOOTED_OUT',
  EXPIRED: 'EXPIRED',
})

export function getDropPhase({
  dropEpochMs,
  expiresEpochMs,
  remainingStock,
  nowEpochMs = Date.now(),
}) {
  if (nowEpochMs < dropEpochMs) {
    return DROP_PHASE.WARMUP
  }

  if (nowEpochMs >= expiresEpochMs) {
    return DROP_PHASE.EXPIRED
  }

  if (remainingStock <= 0) {
    return DROP_PHASE.LOOTED_OUT
  }

  return DROP_PHASE.AIRDROP_LIVE
}