import styles from '../styles/PlayGame.module.css';

import { EmojiCard } from './EmojiCard';
import { useGameStore } from '../hooks/useGameStore';

export const PlayGame = () => {
  const { getCards } = useGameStore({})

  const cards = getCards()

  return (
    <div className={styles['card-container']}>
      {cards.map((emoji, index) => (
        <EmojiCard
          key={index}
          emoji={emoji}
          idx={index}
        />))
      }
    </div>
  )
}
