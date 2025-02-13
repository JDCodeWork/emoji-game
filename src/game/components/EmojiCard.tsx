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

  const handleSelect = () => addSelected(idx)

  return (
    <button
      className={cn(
        "rounded-md size-28 relative focus:outline-0 before:content-[' '] before:size-31 before:absolute before:top-[-6px] before:left-[-6px] before:-z-10 before:rounded bg-slate-900  before:bg-slate-800 hover:opacity-90 hover:cursor-pointer",
        isSelected &&
        'bg-slate-800 before:bg-gradient-to-br before:from-violet-600 before:to-blue-500 before:text-transparent hover:opacity-100 hover:cursor-default',
        isMatch &&
        'before:bg-gradient-to-br before:from-violet-900 before:to-blue-900 before:text-transparent hover:opacity-100 hover:cursor-default'
      )}
      disabled={isSelected || isMatch || selected.length == 2}

      onClick={handleSelect}
    >
      <div className={cn('text-6xl -translate-y-1 hidden', isSelected && "text-white block", isMatch && "text-white/50 block")}>
        {emoji}
      </div>
    </button>
  )
}