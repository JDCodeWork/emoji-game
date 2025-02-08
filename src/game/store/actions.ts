import { GameState } from "../interface/game-state"
import { useStore } from "./store"

export const onStartGame = (cards: string[]) => useStore.setState({
  state: GameState.PLAYING,
  cards
})
export const onWinGame = () => useStore.setState({
  state: GameState.WON,
  matches: []
})

export const addMatched = (matched: string) => useStore.setState((state) => {
  if (state.matches.includes(matched)) {
    return state
  }

  return {
    selected: [],
    matches: [...state.matches, matched]
  }
})
export const addSelected = (idx: number) => useStore.setState((state) => ({
  selected: [...state.selected, idx]
}))

export const clearSelected = () => useStore.setState({ selected: [] })