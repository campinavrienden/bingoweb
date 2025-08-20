import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPart from './adminPart'
import { StoreProvider } from './stores/StoreProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <AdminPart />
    </StoreProvider>
  </StrictMode>,
)
