import { EmojiCard } from './EmojiCard';
import { useGameStore } from '../hooks/useGameStore';

export const PlayGame = () => {
  const { getCards, getTime } = useGameStore()

  const cards = getCards()
  const time = getTime()

  return (
    <>
      <div className="">{time}</div>
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
