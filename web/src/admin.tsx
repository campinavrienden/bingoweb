{/* tailwind safelist: shadow-round shadow-red-700 */ }
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPart from './pages/adminPart'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AdminPart />
  </StrictMode>,
)
