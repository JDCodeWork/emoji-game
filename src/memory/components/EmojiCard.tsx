import { cn } from '../../shared/utils/cn';
import { onSelect } from '../store/actions';
import { useMemoryLogic } from '../hooks/useMemoryLogic';

interface Props {
  emoji: string
  idx: number
}

export const EmojiCard = ({ emoji, idx }: Props) => {
  const { selected, matches } = useMemoryLogic()

  const isSelected = selected.includes(idx)
  const isMatch = matches.includes(emoji)

  const handleSelect = () => onSelect(idx)

  return (
    <button
      className={cn(
        "rounded-md size-20 border-2 border-slate-800 md:border-none md:size-28 relative focus:outline-0 md:before:content-[' '] md:before:size-31 md:before:absolute md:before:top-[-6px] md:before:left-[-6px] md:before:-z-10 md:before:rounded bg-slate-900  md:before:bg-slate-800 hover:opacity-90 md:hover:cursor-pointer",
        isSelected &&
        'bg-slate-800 border-violet-600 md:before:bg-gradient-to-br md:before:from-violet-600 md:before:to-blue-500 md:before:text-transparent hover:opacity-100 hover:cursor-default',
        isMatch &&
        'border-blue-900 md:before:bg-gradient-to-br md:before:from-violet-900 md:before:to-blue-900 md:before:text-transparent hover:opacity-100 hover:cursor-default'
      )}
      disabled={isSelected || isMatch || selected.length == 2}

      onClick={handleSelect}
    >
      <div className={cn('text-5xl md:text-6xl md:-translate-y-1 hidden', isSelected && "text-white block", isMatch && "text-white/50 block")}>
        {emoji}
      </div>
    </button>
  )
}