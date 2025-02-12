import { useEffect, useState } from "react"
import useSound from "use-sound"

import winSfx from '../sounds/win.mp3'
import loseSfx from '../sounds/lose.mp3'
import countdownSfx from '../sounds/countdown.mp3'

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

type CountState = "off" | "on" | "pause"

interface Opts {
  gridSize?: number
  playTime?: number
}
export const useGameStore = (opts?: Opts) => {
  const { gridSize = 20, playTime = 45 } = opts ?? {}

  // TODO refactor this
  const [playWinSfx] = useSound(winSfx, { volume: .08 })
  const [playLoseSfx] = useSound(loseSfx, { volume: .5 })
  const [playCountdownSfx, { stop: stopCountdownSfx, pause: pauseCountDownSfx }] = useSound(countdownSfx)

  const [countState, setCountState] = useState<CountState>('off')

  const cards = useStoreSelector.use.getCards()
  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()
  const time = useStoreSelector.use.getTime()
  const state = useStoreSelector.use.getState()

  const handleStartGame = () => {
    const newCards = createCards(emojis, gridSize)
    handleTransition(() => onStartGame(newCards, playTime))
  }

  const handleWinGame = () => {
    if (countState == "on") {
      setCountState("off")
      stopCountdownSfx()
    }

    playWinSfx()
    onWinGame()
  }

  const handleLoseGame = () => {
    if (countState == "on") {
      setCountState("off")
      stopCountdownSfx()
    }

    playLoseSfx()
    handleTransition(onLossGame)
  }

  useEffect(() => {
    if (state == GameState.PAUSED && countState == "on") {
      setCountState("pause")
      pauseCountDownSfx()
    }

    if (state == GameState.PLAYING && countState == "pause") {
      playCountdownSfx()
      setCountState("on")
    }
  }, [state, countState]);

  useEffect(() => {
    if (time == 10 && state == GameState.PLAYING && countState == "off") {
      playCountdownSfx()
      setCountState('on')
    }
  }, [time, state]);

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
    if (matches.length == gridSize / 2) handleWinGame()
  }, [matches]);

  useEffect(() => {
    if (state != GameState.PLAYING) return;

    if (time == 0) handleLoseGame()

    const timer = setInterval(decreaseTime, 1000);

    return () => clearInterval(timer)
  }, [time]);

  return {
    ...useStoreSelector.use,
    handleStartGame,
  }
}