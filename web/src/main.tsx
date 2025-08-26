{/* tailwind safelist: shadow-round shadow-red-700 */}
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StoreProvider } from './stores/StoreProvider';

const PublicPage = lazy(() => import('./clientPart'));

// index.js or App.js
if ('serviceWorker' in navigator) {
  const swPath = import.meta.env.DEV
    ? `/sw.js` // served from public in dev
    : '/assets/js/sw.js'; // bundled in prod
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      navigator.serviceWorker.register(swPath, { type: 'module', scope: "/ " })
        .then(reg => console.log('SW registered', reg))
        .catch(err => console.error('SW registration failed', err));
    }, 500)
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <StoreProvider>
        <PublicPage />
      </StoreProvider>
    </Suspense>
  </StrictMode>,
)
