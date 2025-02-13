import { useEffect, useState } from "react"
import useSound from "use-sound"

import timerSound from '../sounds/timer.mp3'
import loseSound from '../sounds/lose.mp3'
import winSound from '../sounds/win.mp3'

import { useGameSelector } from "./useGameSelector"
import { GameState as GS } from "../interface/game-state"

export const useGameSound = () => {
  const [effectsSound, setEffectsSound] = useState(1)

  const [playWinSfx] = useSound(winSound, { volume: effectsSound * .5 })
  const [playLoseSfx] = useSound(loseSound, { volume: effectsSound * 1 })

  const [
    playTimerSfx,
    { stop: stopTimerSfx }
  ] = useSound(timerSound, { volume: effectsSound * 1 })

  const [isActiveTimer, setIsActiveTimer] = useState(false)
  const [isOldGameStatePaused, setIsOldGameStatePaused] = useState(false)

  const gameState = useGameSelector().getState()
  const timer = useGameSelector().getTime()

  const onToggleEffectsSound = () => {
    if (effectsSound > 0) {
      setEffectsSound(0)
    } else {
      setEffectsSound(1)
    }
  }

  //? Game sound logic
  // When game end but timer is active
  useEffect(() => {
    if (isActiveTimer && gameState != GS.PLAYING && gameState != GS.PAUSED) {
      setIsActiveTimer(false)
      stopTimerSfx()
    }
  }, [gameState, isActiveTimer]);

  // When the timer is active but player pauses the game
  useEffect(() => {
    if (isActiveTimer && gameState == GS.PAUSED) {
      setIsOldGameStatePaused(true)
      stopTimerSfx()
    }
  }, [gameState, isActiveTimer]);

  // When the player continues with the game
  useEffect(() => {
    if (isActiveTimer && isOldGameStatePaused && gameState == GS.PLAYING) {
      playTimerSfx()
    }
  }, [gameState, isActiveTimer]);


  // When the player is playing but the timer is close to expiring
  useEffect(() => {
    if (timer == 5 && !isActiveTimer && gameState == GS.PLAYING) {
      setIsActiveTimer(true)
      playTimerSfx()
    }
  }, [timer, isActiveTimer, gameState]);


  useEffect(() => {
    if (gameState == GS.WON) {
      playWinSfx()
    }

    if (gameState == GS.LOST) {
      playLoseSfx()
    }
  }, [gameState]);

  return {
    effectsSound,
    onToggleEffectsSound
  }
}