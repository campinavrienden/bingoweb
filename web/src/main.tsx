import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StoreProvider } from './stores/StoreProvider';

const PublicPage = lazy(() => import('./clientPart'));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense>
      <StoreProvider>
        <PublicPage />
      </StoreProvider>
    </Suspense>
  </StrictMode>,
)
