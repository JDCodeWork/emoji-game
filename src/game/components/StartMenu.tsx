import { useGameStore } from "../hooks/useGameStore"

export const StartMenu = () => {
  const { handleStartGame } = useGameStore({})

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold uppercase">Empareja los emojis 🎮</h1>

      <button
        className="mx-8 mt-8 bg-slate-800 hover:bg-slate-700 rounded outline-1 outline-slate-700 px-4 py-2 text-lg uppercase font-bold"
        onClick={handleStartGame}
      >
        Iniciar juego
      </button>
    </div>
  )
}