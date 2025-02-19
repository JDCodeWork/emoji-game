export const handleTransition = (fn: () => void) => {
  if (document.startViewTransition) document.startViewTransition(fn)
  else fn()
}