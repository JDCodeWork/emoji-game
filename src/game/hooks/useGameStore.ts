import { useEffect, useTransition } from "react"
import { emojis } from "../constants/emojis"
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
import { GameState } from "../interface/game-state"
import { handleTransition } from "../utils/handle-transition"

interface Opts {
  gridSize?: number
  playTime?: number
}
export const useGameStore = (opts?: Opts) => {
  const { gridSize = 20, playTime = 45 } = opts ?? {}

  const cards = useStoreSelector.use.getCards()
  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()
  const time = useStoreSelector.use.getTime()
  const state = useStoreSelector.use.getState()

  const handleStartGame = () => {
    const newCards = createCards(emojis, gridSize)

    handleTransition(() => onStartGame(newCards, playTime))
  }

  useEffect(() => {
    if (selected.length == 2) {
      const [first, second] = selected

      if (cards[first] == cards[second]) {
        addMatched(cards[first])
      } else {
        setTimeout(() =>
          handleTransition(clearSelected)
          , 400)
      }
    }
  }, [selected]);

  useEffect(() => {
    if (matches.length == gridSize / 2) {
      onWinGame()
    }
  }, [matches]);

  useEffect(() => {
    if (state != GameState.PLAYING) return;

    if (time == 0) handleTransition(onLossGame)

    const timer = setInterval(decreaseTime, 1000);

    return () => clearInterval(timer)
  }, [time]);

  return {
    ...useStoreSelector.use,
    handleStartGame,
  }
}