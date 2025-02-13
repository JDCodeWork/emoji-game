import { useEffect } from "react"

import { emojis } from "../constants/emojis"
import { GameState } from "../interface/game-state"
import {
  addMatched,
  clearSelected,
  decreaseTime,
  onLossGame,
  onStartGame,
  onWinGame
} from "../store/actions"
import { useStoreSelector } from "../store/selectors"
import { createCards } from "../utils/create-cards"
import { handleTransition } from "../utils/handle-transition"


interface Opts {
  gridSize?: number
  playTime?: number
}
export const useGameState = (opts?: Opts) => {
  const { gridSize = 10, playTime = 10 } = opts ?? {}

  const cards = useStoreSelector.use.getCards()
  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()
  const time = useStoreSelector.use.getTime()
  const state = useStoreSelector.use.getState()

  const handleStartGame = () => {
    const newCards = createCards(emojis, gridSize)
    handleTransition(() => onStartGame(newCards, playTime))
  }

  const handleWinGame = () => handleTransition(onWinGame)
  const handleLoseGame = () => handleTransition(onLossGame)

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
    if (matches.length == gridSize / 2) handleWinGame()
  }, [matches]);

  useEffect(() => {
    if (state != GameState.PLAYING) return;

    if (time == 0) handleLoseGame()

    const timer = setInterval(decreaseTime, 1000);

    return () => clearInterval(timer)
  }, [time]);

  return {
    handleStartGame,
  }
}