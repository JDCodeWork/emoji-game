import Layout from '../components/game-status'
import { useMemoryState } from '../hooks/useMemoryState'

export const StartView = () => {
  const { handleStartGame } = useMemoryState()

  return (
    <Layout.Display>
      <Layout.Title title='Empareja los emojis 🎮' />
      <Layout.Action
        label='Iniciar Juego'
        onClick={handleStartGame}
        className="py-2 px-4 rounded mt-4 md:mt-0"
      />
    </Layout.Display>
  )
}