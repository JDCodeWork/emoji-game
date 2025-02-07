
import { create } from 'zustand'
import { GameState } from '../interface/game-state'
import { devtools } from 'zustand/middleware'

interface Store {
  state: GameState
}

const initialStore: Store = {
  state: GameState.START
}


export const useGameStore = create<Store>()(
  devtools(() => ({
    ...initialStore
  }))
)
