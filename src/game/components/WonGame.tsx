import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

import Layout from './game-status'

import { useGameState } from '../hooks/useGameState';

export const WonGame = () => {
  const [isEndAnimation, setIsEndAnimation] = useState(false)
  const { handleStartGame } = useGameState()

  const { isMobile } = Layout.useMobile()

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
        particleCount: isMobile ? 2 : 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: isMobile ? 2 : 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }())
  }, []);

  return (
    <Layout.Display>
      <Layout.Title title='¡¡Felicidades 🥳!!' />
      <Layout.SubTitle label='Ganaste...' />
      <Layout.Action
        label='Jugar de nuevo'
        onClick={handleStartGame}
        disabled={!isEndAnimation}
      />
    </Layout.Display>
  )
}
