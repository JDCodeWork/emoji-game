import { StartMenu } from "./components/StartMenu"
import { GameState } from "./interface/game-state"
import { PlayGame } from "./components/PlayGame"
import { useGameStoreSelector } from "./store/selectors"

export const GamePage = () => {

  const gameState = useGameStoreSelector.use.state()

  let renderGameState;

  if (gameState == GameState.START) {
    renderGameState = <StartMenu />
  }

  if (gameState == GameState.PLAYING) {
    renderGameState = <PlayGame />
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      {renderGameState}
    </main>
  )
}
