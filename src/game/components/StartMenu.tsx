import { useGameState } from "../hooks/useGameState"
import Layout from './game-status'

export const StartMenu = () => {
  const { handleStartGame } = useGameState()

  return (
    <Layout.Display>
      <Layout.Title title='Empareja los emojis 🎮' />
      <Layout.Action
        label='Iniciar Juego'
        onClick={handleStartGame}
        className="py-2 px-4 rounded"
      />
    </Layout.Display>
  )
}