import { useEffect, useState } from "react"
import useSound from "use-sound"

import timerSound from '../sounds/timer.mp3'
import loseSound from '../sounds/lose.mp3'
import winSound from '../sounds/win.mp3'

import { useMemoryState } from "./useMemoryState"

export const useMemorySound = () => {
  const [effectsSound, setEffectsSound] = useState(1)

  const [playWinSfx] = useSound(winSound, { volume: effectsSound * .5 })
  const [playLoseSfx] = useSound(loseSound, { volume: effectsSound * 1 })

  const [
    playTimerSfx,
    { stop: stopTimerSfx }
  ] = useSound(timerSound, { volume: effectsSound * 1 })

  const [isActiveTimer, setIsActiveTimer] = useState(false)
  const [isOldGameStatePaused, setIsOldGameStatePaused] = useState(false)

  const { state, timer } = useMemoryState()

  const onToggleEffectsSound = () => {
    if (effectsSound > 0) {
      setEffectsSound(0)
    } else {
      setEffectsSound(1)
    }
  }

  // When game end but time is active
  useEffect(() => {
    if (isActiveTimer && state != "playing" && state != "paused") {
      setIsActiveTimer(false)
      stopTimerSfx()
    }
  }, [state, isActiveTimer]);

  // When the time is active but player pauses the game
  useEffect(() => {
    if (isActiveTimer && state == "paused") {
      setIsOldGameStatePaused(true)
      stopTimerSfx()
    }
  }, [state, isActiveTimer]);

  // When the player continues with the game
  useEffect(() => {
    if (isActiveTimer && isOldGameStatePaused && state == "playing") {
      playTimerSfx()
    }
  }, [state, isActiveTimer]);


  // When the player is playing but the time is close to expiring
  useEffect(() => {
    if (timer == 5 && !isActiveTimer && state == "playing") {
      setIsActiveTimer(true)
      playTimerSfx()
    }
  }, [timer, isActiveTimer, state]);


  useEffect(() => {
    if (state == "won") {
      playWinSfx()
    }

    if (state == "lost") {
      playLoseSfx()
    }
  }, [state]);

  return {
    effectsSound,
    onToggleEffectsSound
  }
}