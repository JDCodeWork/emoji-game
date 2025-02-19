import { useEffect } from "react"

import { useMemoryStore } from "@/memory/store"
import { clearSelected, onMatch } from "../store/actions"
import { useMemoryState } from "./useMemoryState"

export const useMemoryLogic = () => {
  const { handleWinGame } = useMemoryState()

  const { active, matches, selected } = useMemoryStore(s => s.cards)

  useEffect(() => {
    if (selected.length == 2) {
      const [first, second] = selected

      if (active[first] == active[second]) {
        onMatch(active[first])
      } else {
        setTimeout(clearSelected, 400)
      }
    }
  }, [selected]);

  useEffect(() => {
    if (matches.length == active.length / 2) handleWinGame()
  }, [matches]);

  return {
    active,
    selected,
    matches
  }
}