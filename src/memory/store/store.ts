import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import MemoryStore from '../interface/memory-store'

export const initialStore: MemoryStore = {
  state: "start",
  timer: 0,
  cards: {
    active: [],
    matches: [],
    selected: []
  },
  config: {
    gridSize: 10,
    playTime: 15
  }
}

export const useMemoryStore = create<MemoryStore>()(
  devtools(() => ({
    ...initialStore
  }))
)