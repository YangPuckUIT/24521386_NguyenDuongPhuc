const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export class ClaimError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ClaimError'
    this.status = status
  }
}

export async function claimDrop({
  dropId,
  claimId,
  scenario = 'success',
}) {
  await sleep(1200)

  if (!dropId || !claimId) {
    throw new ClaimError('Invalid claim request', 400)
  }

  if (scenario === 'conflict') {
    throw new ClaimError(
      '409 Conflict: This drop has been looted out.',
      409
    )
  }

  if (scenario === 'network') {
    throw new ClaimError('Network connection failed', 503)
  }

  return {
    success: true,
    claimId,
    dropId,
    status: 200,
  }
}