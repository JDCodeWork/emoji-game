import { GameState } from "../interface/game-state"
import { useStore } from "./store"

export const onStartGame = (cards: string[], playTime: number) => useStore.setState({
  state: GameState.PLAYING,
  cards,
  time: playTime
})
export const onWinGame = () => useStore.setState({
  state: GameState.WON,
  matches: []
})
export const onLossGame = () => useStore.setState({
  state: GameState.LOST,
  matches: [],
  selected: [],
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

export const decreaseTime = () => useStore.setState(state => ({ time: state.time - 1 }))
