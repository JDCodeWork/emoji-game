import { StartMenu } from "./components/StartMenu"
import { GameState } from "./interface/game-state"
import { PlayGame } from "./components/PlayGame"
import { WonGame } from "./components/WonGame"
import { LostGame } from "./components/LostGame"
import { PausedMenu } from "./components/PausedMenu"
import { useGameStore } from "./hooks/useGameStore"

export const GamePage = () => {

  const { getState } = useGameStore({})

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
    <main className="flex items-center justify-center w-screen h-screen">
      {renderGameState}
    </main>
  )
}
