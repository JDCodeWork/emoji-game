export const matchesCards = (cardsIndex: number[], cardsContend: string[]): boolean => {
  const [first, second] = cardsIndex

  return cardsContend[first] === cardsContend[second]
}