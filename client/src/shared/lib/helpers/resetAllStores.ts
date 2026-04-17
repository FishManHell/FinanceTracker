import { pinia } from '@/app/pinia.ts'

type ResettableStore = {
  $reset?: () => void
  reset?: () => void
}

interface PiniaInternal {
  _s: Map<string, ResettableStore>
}

export function resetAllStores() {
  const internal = pinia as unknown as PiniaInternal

  internal._s.forEach((store) => {
    if (typeof store.$reset === 'function') {
      store.$reset()
    } else if (typeof store.reset === 'function') {
      store.reset()
    }
  })
}
