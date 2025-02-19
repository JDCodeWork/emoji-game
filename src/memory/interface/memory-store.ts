export default interface MemoryStore {
  state: MemoryStateTypes
  timer: number

  cards: MemoryCardsState

  config: MemoryConfigState
}

export type MemoryStateTypes = 'start' | 'playing' | 'paused' | 'won' | 'lost'

export interface MemoryCardsState {
  active: string[] // All the cards they are playing

  selected: number[]
  matches: string[]
}

export interface MemoryConfigState {
  playTime: number,
  gridSize: number
}