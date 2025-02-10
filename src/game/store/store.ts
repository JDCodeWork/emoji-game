
import { create } from 'zustand'
import { GameState } from '../interface/game-state'
import { devtools } from 'zustand/middleware'

interface Store {
  state: GameState
  time: number

  cards: string[],
  selected: number[],
  matches: string[]
}

const initialStore: Store = {
  state: GameState.START,
  time: 20,
  cards: [],
  selected: [],
  matches: [],
}


export const useStore = create<Store>()(
  devtools(() => ({
    ...initialStore
  }))
)
