import { EmojiCard } from './EmojiCard';
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
      <div className="flex flex-wrap w-full mx-auto px-2 place-content-center md:w-auto md:mx-0 md:grid md:grid-cols-5 gap-4 md:gap-6">
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
