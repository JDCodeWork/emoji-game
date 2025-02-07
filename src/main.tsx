import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GamePage } from './game/GamePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GamePage />
  </StrictMode>,
)
