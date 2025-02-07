import { setStateToPlaying } from "../store/actions"

export const StartMenu = () => {

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold uppercase">Emoji Game 🎮</h1>
      <StartMenuButton label="play" action={setStateToPlaying} />
    </div>
  )
}

interface StartMenuButtonProps {
  label: string
  action: () => void
}
const StartMenuButton = ({ label, action }: StartMenuButtonProps) => {
  return (
    <button className="bg-slate-800 hover:bg-slate-700 rounded outline-1 outline-slate-700 px-4 py-2 text-lg uppercase font-bold " onClick={action}>
      {label}
    </button>
  )
}
