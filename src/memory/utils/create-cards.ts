export const createCards = (content: string[], gridSize: number) => {
  let cards = new Set<string>()
  let maxCards = gridSize / 2

  while (cards.size < maxCards) {
    const randomIndex = Math.floor(Math.random() * content.length)

    cards.add(content[randomIndex])
  }

  return shuffle([...cards, ...cards])
}

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5)
}

