import { StartMenu } from "./components/StartMenu"
import { GameState } from "./interface/game-state"
import { PlayGame } from "./components/PlayGame"
import { WonGame } from "./components/WonGame"
import { LostGame } from "./components/LostGame"
import { PausedMenu } from "./components/PausedMenu"
import { useGameSound } from "./hooks/useGameSound"
import { useGameSelector } from "./hooks/useGameSelector"
import { useGameState } from "./hooks/useGameState"
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"

export const GamePage = () => {
  useGameState()
  const { onToggleEffectsSound, effectsSound } = useGameSound()

  const { getState } = useGameSelector()

  const gameState = getState()

  let renderGameState;

  switch (gameState) {
    case GameState.PLAYING:
      renderGameState = <PlayGame />
      break;
    case GameState.WON:
      renderGameState = <WonGame />
      break;
    case GameState.LOST:
      renderGameState = <LostGame />
      break;
    case GameState.PAUSED:
      renderGameState = <PausedMenu />
      break;
    default:
      renderGameState = <StartMenu />
      break;
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen">
      <button
        onClick={onToggleEffectsSound}
        className="bg-gray-700 border-2 border-gray-600 rounded-full p-3 absolute top-10 right-10 hover:bg-gray-600 hover:cursor-pointer"
      >
        {
          effectsSound > 0 ? (<HiVolumeUp />) : (<HiVolumeOff />)
        }
      </button>
      {renderGameState}
    </main>
  )
}
