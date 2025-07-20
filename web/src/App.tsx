import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const PublicPage = lazy(() => import('./clientPart/ClientPart'));
const AdminPage = lazy(() => import('./adminPart/AdminPart'));

function App() {
  return (
    <>
     <Router>
      <Suspense fallback={<div>Laden...</div>}>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </Router>
    </>
  )
}

export default App
