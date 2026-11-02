
import { PUBG_VN_SQUADS } from '../data/pubgSquads';

export function fetchKraftonPubgTelemetry(
  squadId,
  { signal } = {}
) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const delay = 1500 + Math.random() * 1500;

    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);

      const squad = PUBG_VN_SQUADS.find(
        (item) => item.id === squadId
      );

      if (!squad) {
        reject(new Error('Squad not found'));
        return;
      }

      if (Math.random() < 0.35) {
        reject(new Error('Satellite packet timeout (35% loss)'));
        return;
      }

      resolve(squad);
    }, delay);

    function onAbort() {
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      reject(new DOMException('Aborted', 'AbortError'));
    }

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}
