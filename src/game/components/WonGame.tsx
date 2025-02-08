import confetti from 'canvas-confetti'
import { useEffect } from 'react';
import { useGameStore } from '../hooks/useGameStore';

export const WonGame = () => {
  const { handleStartGame } = useGameStore()

  const duration = 2 * 1000;
  const end = Date.now() + duration;

  useEffect(() => {
    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      // keep going until we are out of time
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }())
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-4xl font-bold uppercase">¡¡Felicidades 🥳!! </h1>
      <h2 className='text-2xl font-black uppercase text-center leading-0'>Ganaste.</h2>
      <button
        className="py-2 m-6 text-lg font-bold uppercase rounded x-4 bg-slate-800 hover:bg-slate-700 outline-1 outline-slate-700"
        onClick={handleStartGame}
      >
        Jugar de nuevo
      </button>
    </div>
  )
}
