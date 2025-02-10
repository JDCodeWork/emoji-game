import styles from '../styles/PlayGame.module.css';

import { useStoreSelector } from '../store/selectors';
import { addSelected } from '../store/actions';
import { cn } from '../../utils/cn';

interface Props {
  emoji: string
  idx: number
}

export const EmojiCard = ({ emoji, idx }: Props) => {
  const selected = useStoreSelector.use.getSelected()
  const matches = useStoreSelector.use.getMatches()

  const isSelected = selected.includes(idx)
  const isMatch = matches.includes(emoji)

  return (
    <button
      className={cn(
        "rounded-md size-28 relative focus:outline-0 before:contents  before:size-31 before:absolute before:top-[-6px] before:left-[-6px] before:-z-1 before:rounded bg-slate-900 before:bg-slate-800",
        isSelected &&
        'bg-slate-800 before:bg-gradient-to-br before:from-violet-600 before:to-blue-500 before:text-transparent',
        isMatch &&
        'before:bg-gradient-to-br before:from-violet-900 before:to-blue-900 before:text-transparent'
      )}
      disabled={isSelected || isMatch || selected.length == 2}
      onClick={() => addSelected(idx)}
    >
      <div className={cn('text-6xl -translate-y-1 text-transparent', isSelected && "text-white", isMatch && "text-white/50")}>
        {emoji}
      </div>
    </button>
  )
}