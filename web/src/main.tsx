{/* tailwind safelist: shadow-round shadow-red-700 */}
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const PublicPage = lazy(() => import('./pages/clientPart'));

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      navigator.serviceWorker.register('swJs', { type: 'module' })
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.error('SW registration failed', err));
    }, 500)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
        <PublicPage />
    </Suspense>
  </StrictMode>,
)
