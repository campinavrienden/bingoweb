import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminPart from './adminPart'
import { AdminStoreProvider } from './stores/AdminStoreProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AdminStoreProvider>
      <AdminPart />
    </AdminStoreProvider>
  </StrictMode>,
)
