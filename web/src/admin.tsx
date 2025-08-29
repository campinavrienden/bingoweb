{/* tailwind safelist: shadow-round shadow-red-700 */ }
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPart from './pages/adminPart'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      navigator.serviceWorker.register('adminsw.js', { type: 'module' })
        .then(reg => console.log('Admin SW registered', reg))
        .catch(err => console.error('Admin SW registration failed', err));
    }, 500)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AdminPart />
  </StrictMode>,
)
