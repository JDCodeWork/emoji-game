import { useStoreSelector } from "../store/selectors"

export const useGameSelector = () => ({
  ...useStoreSelector.use
})