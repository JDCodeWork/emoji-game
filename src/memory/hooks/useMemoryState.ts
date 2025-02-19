import { useEffect } from "react"

import { useMemoryStore } from "@/memory/store"
import { handleTransition } from "@/shared/utils/handle-transition"
import { decreaseTime, loseGame, onEscape, onStartGame, winGame } from "../store/actions"
import { createCards } from "../utils/create-cards"
import { EMOJIS } from "@/shared/constants/emojis"

export const useMemoryState = () => {
  const timer = useMemoryStore(s => s.timer)
  const state = useMemoryStore(s => s.state)

  const gridSize = useMemoryStore(s => s.config.gridSize)

  const handleWinGame = () => handleTransition(winGame)
  const handleLoseGame = () => handleTransition(loseGame)

  const handleStartGame = () => {
    const activeCards = createCards(EMOJIS, gridSize)
    onStartGame(activeCards)
  }

  const handlePauseGame = (ev: KeyboardEvent) => ev.key === "Escape" && onEscape()

  useEffect(() => {
    if (state != "playing") return;

    if (timer == 0) handleLoseGame()

    const decreaseInterval = setInterval(decreaseTime, 1000);

    return () => clearInterval(decreaseInterval)
  }, [timer]);

  useEffect(() => {
    document.addEventListener('keydown', handlePauseGame)

    return () => document.removeEventListener('keydown', handlePauseGame)
  }, [state]);

  return {
    state,
    timer,
    handleStartGame,
    handleWinGame
  }
}