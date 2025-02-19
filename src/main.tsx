import { createRoot } from 'react-dom/client'
import './index.css'
import { MainMemoryView } from './memory/views'

createRoot(document.getElementById('root')!).render(
  <MainMemoryView />
)
