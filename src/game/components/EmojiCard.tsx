import styles from '../styles/PlayGame.module.css';

import { useEffect, useState } from "react"
import { useStoreSelector } from '../store/selectors';
import { addSelected } from '../store/actions';

interface Props {
  emoji: string
  idx: number
}

export const EmojiCard = ({ emoji, idx }: Props) => {
  const [isSelectedOrMatched, setIsSelectedOrMatched] = useState(false)

  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()

  useEffect(() => {
    setIsSelectedOrMatched(selected.includes(idx) || matches.includes(emoji))
  }, [selected]);

  return (
    <button
      className={`${styles.card} ${isSelectedOrMatched ? styles['--selected'] : ''}`}
      disabled={isSelectedOrMatched}
      onClick={() => addSelected(idx)}
    >
      <div className={styles['card__content']}>
        {emoji}
      </div>
    </button>
  )
}