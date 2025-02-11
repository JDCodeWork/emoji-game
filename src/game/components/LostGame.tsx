import confetti from 'canvas-confetti'
import { useGameStore } from "../hooks/useGameStore"
import { useEffect } from 'react';

export const LostGame = () => {
  const { handleStartGame } = useGameStore()

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        ticks: 300,
        particleCount: 4,
        angle: Math.random() * 60 + 60,
        spread: 80,
        startVelocity: Math.random() * 40 + 40,
        colors: ["#808080", "#4F4F4F", "#A9A9A9"],
        gravity: 1,
        origin: { x: Math.random(), y: 0 },
      });

      confetti({
        ticks: 300,
        particleCount: 4,
        angle: Math.random() * 60 + 60,
        spread: 80,
        startVelocity: Math.random() * 40 + 40,
        colors: ["#808080", "#4F4F4F", "#A9A9A9"],
        gravity: 1,
        origin: { x: Math.random(), y: 0 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()
  }, []);


  return (
    <div className="flex flex-col gap-4 text-center ">
      <h1 className="text-4xl font-bold uppercase mb-2">¡Buuuuu! 👎</h1>
      <h2 className="text-2xl font-black uppercase leading-0">Has perdido, qué vergüenza... 😆</h2>
      <button
        className="py-2 m-8 text-lg font-bold uppercase rounded x-4 bg-slate-800 hover:bg-slate-700 outline-1 outline-slate-700"
        onClick={handleStartGame}
      >
        Jugar de nuevo
      </button>
    </div>
  )
}
