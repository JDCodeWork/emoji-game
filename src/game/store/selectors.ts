import { StoreApi, UseBoundStore } from 'zustand'
import { useStore } from './store'

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] } }
  : never

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>
  store.use = {}

  for (let key of Object.keys(store.getState())) {
    const capitalizedKey = `get${key.charAt(0).toUpperCase()}${key.slice(1)}` as `get${Capitalize<string & typeof key>}`

    (store.use as any)[capitalizedKey] = () => store((s) => s[key as keyof typeof s])
  }

  return store
}

export const useStoreSelector = createSelectors(useStore)
