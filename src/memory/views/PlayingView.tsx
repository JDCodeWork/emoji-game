import { EmojiCard } from '../components/EmojiCard';
import { useEffect, useState } from 'react';
import { cn } from '../../shared/utils/cn';
import { useMemoryState } from '../hooks/useMemoryState';
import { useMemoryLogic } from '../hooks/useMemoryLogic';

type TimeState = "normal" | "warning" | "danger"

export const PlayingView = () => {
  const [timeState, setTimeState] = useState<TimeState>("normal")

  const { timer } = useMemoryState()
  const { active: activeCards } = useMemoryLogic()

  useEffect(() => {
    if (timer >= 0 && timer < 5 && timeState != "danger") setTimeState("danger")
    else if (timer >= 5 && timer < 10 && timeState != "warning") setTimeState("warning")
  }, [timer]);

  return (
    <>
      <div className={cn("text-4xl mb-8 font-bold", timeState == "danger" && "text-red-400 animate-ping delay-75", timeState == "warning" && "text-orange-400 animate-pulse")}>{timer}</div>
      <div className="flex flex-wrap w-full mx-auto px-2 place-content-center md:w-auto md:mx-0 md:grid md:grid-cols-5 gap-4 md:gap-6">
        {activeCards.map((emoji, index) => (
          <EmojiCard
            key={index}
            emoji={emoji}
            idx={index}
          />))
        }
      </div>
    </>
  )
}
