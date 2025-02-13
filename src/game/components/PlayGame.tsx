import { EmojiCard } from './EmojiCard';
import { useGameState } from '../hooks/useGameState';
import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';
import { useGameSelector } from '../hooks/useGameSelector';

type TimeState = "normal" | "warning" | "danger"

export const PlayGame = () => {
  const { getCards, getTime } = useGameSelector()
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
