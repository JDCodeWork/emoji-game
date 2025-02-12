import { EmojiCard } from './EmojiCard';
import { useGameStore } from '../hooks/useGameStore';
import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

type TimeState = "normal" | "warning" | "danger"

export const PlayGame = () => {
  const { getCards, getTime } = useGameStore()
  const [timeState, setTimeState] = useState<TimeState>("normal")

  const cards = getCards()
  const time = getTime()

  useEffect(() => {
    if (time >= 0 && time < 5 && timeState != "danger") setTimeState("danger")
    else if (time >= 5 && time < 10 && timeState != "warning") setTimeState("warning")
  }, [time]);

  return (
    <>
      <div className={cn("text-4xl mb-8 font-bold", timeState == "danger" && "text-red-400 animate-ping delay-75", timeState == "warning" && "text-orange-400 animate-pulse")}>{time}</div>
      <div className="grid grid-cols-5 gap-6">
        {cards.map((emoji, index) => (
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
