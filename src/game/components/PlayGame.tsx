import { emojis } from "../constants/emojis"

const gridSize = 20

const createGrid = () => {
  let cards = new Set<string>()
  let maxCards = gridSize / 2

  while (cards.size < maxCards) {
    const randomIndex = Math.floor(Math.random() * emojis.length)

    cards.add(emojis[randomIndex])
  }

  return shuffle([...cards, ...cards])
}

const shuffle = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5)
}

export const PlayGame = () => {
  const grid = createGrid()

  console.log('grid', grid)
  return (
    <div>PlayGame</div>
  )
}
