import confetti from 'canvas-confetti'
import { useMemoryState } from "../hooks/useMemoryState"
import { useEffect, useState } from 'react';

import Layout from '../components/game-status'

export const LostView = () => {
  const [isEndAnimation, setIsEndAnimation] = useState(false)

  const { isMobile } = Layout.useMobile()
  const { handleStartGame } = useMemoryState()

  useEffect(() => {
    setTimeout(() => {
      setIsEndAnimation(true)
    }, 2500);
  }, []);

  useEffect(() => {
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        ticks: 300,
        particleCount: isMobile ? 2 : 4,
        angle: Math.random() * 60 + 60,
        spread: 80,
        startVelocity: Math.random() * 40 + 40,
        colors: ["#808080", "#4F4F4F", "#A9A9A9"],
        gravity: 1,
        origin: { x: Math.random(), y: 0 },
      });

      confetti({
        ticks: 300,
        particleCount: isMobile ? 2 : 4,
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
    <Layout.Display>
      <Layout.Title title='¡Buuuuu! 👎' />
      <Layout.SubTitle label='Has perdido, qué vergüenza... 😆' />
      <Layout.Action
        label='Jugar de nuevo'
        onClick={handleStartGame}
        disabled={!isEndAnimation}
      />
    </Layout.Display>
  )
}
