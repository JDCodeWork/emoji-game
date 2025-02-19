import Layout from '../components/game-status'
import { useMemoryState } from '../hooks/useMemoryState'
import { onEscape } from '../store'

export const PausedView = () => {
  const { timer } = useMemoryState()

  return (
    <Layout.Display>
      <Layout.Title title='Juego en pausa' />
      <Layout.SubTitle label={`⏲️ tiempo restante: ${timer}`} className='font-normal opacity-40'/>
      <Layout.Action
        label='Continuar 🎮'
        onClick={onEscape}
      />
    </Layout.Display>
  )
}
