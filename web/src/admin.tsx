import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { StoreProvider } from './stores/store.tsx'
import AdminPart from './adminPart'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <AdminPart />
    </StoreProvider>
  </StrictMode>,
)
