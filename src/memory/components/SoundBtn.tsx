import { HiVolumeOff, HiVolumeUp } from "react-icons/hi"
import { useMemorySound } from "../hooks/useMemorySound"

export const SoundBtn = () => {
  const { onToggleEffectsSound, effectsSound } = useMemorySound()

  return (
    <button
      onClick={onToggleEffectsSound}
      className="bg-gray-700 border-2 border-gray-600 rounded-full p-3 absolute top-10 right-10 hover:bg-gray-600 hover:cursor-pointer"
    >
      {
        effectsSound > 0 ? (<HiVolumeUp />) : (<HiVolumeOff />)
      }
    </button>
  )
}