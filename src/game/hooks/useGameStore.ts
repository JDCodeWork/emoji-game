import { useEffect } from "react"
import { emojis } from "../constants/emojis"
import { addMatched, clearSelected, onStartGame, onWinGame } from "../store/actions"
import { useStoreSelector } from "../store/selectors"
import { createCards } from "../utils/create-cards"

interface Opts {
  gridSize?: number
}
export const useGameStore = (opts?: Opts) => {
  const { gridSize = 20 } = opts ?? {}

  const cards = useStoreSelector.use.getCards()
  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()

  const handleStartGame = () => {
    const newCards = createCards(emojis, gridSize)

    onStartGame(newCards)
  }

  useEffect(() => {
    if (selected.length == 2) {
      const [first, second] = selected

      if (cards[first] == cards[second]) {
        addMatched(cards[first])
      } else {
        setTimeout(clearSelected, 400)
      }
    }
  }, [selected]);

  useEffect(() => {
    if (matches.length == gridSize / 2) {
      onWinGame()
    }
  }, [matches]);

  return {
    ...useStoreSelector.use,
    handleStartGame,
  }
}