import { GameState } from "../interface/game-state"
import { useGameStore } from "./store"

export const setStateToPlaying = () => useGameStore.setState({ state: GameState.PLAYING })