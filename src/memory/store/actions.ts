import { useMemoryStore as useStore } from './store'

export const startGame = () => useStore.setState({ state: "playing" })
export const winGame = () => useStore.setState({ state: "won" })
export const loseGame = () => useStore.setState({ state: "lost" })

export const onEscape = () => useStore.setState(store => {
  if (store.state === "paused") return { state: "playing" }
  if (store.state === "playing") return { state: "paused" }

  return {}
})

export const onStartGame = (activeCards: string[]) => useStore.setState(store => ({
  cards: {
    active: activeCards,
    selected: [],
    matches: []
  },
  state: "playing",
  timer: store.config.playTime
}))

export const decreaseTime = () => useStore.setState(store => ({ timer: store.timer - 1 }))

export const onMatch = (matched: string) => useStore.setState(store => {
  if (store.cards.matches.includes(matched)) return {}

  return {
    cards: {
      ...store.cards,
      selected: [],
      matches: [...store.cards.matches, matched]
    }
  }
})

export const onSelect = (idx: number) => useStore.setState(
  store => ({
    cards: {
      ...store.cards,
      selected: [...store.cards.selected, idx]
    }
  })
)
export const clearSelected = () => useStore.setState(store => ({
  cards: {
    ...store.cards,
    selected: []
  }
}))