import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { EditProvider } from './context/EditContext'
import { useEdit } from './context/EditContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginGate from './components/LoginGate'
import EditBar from './components/EditBar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Inner layout — must be inside EditProvider to call useEdit()
function AppLayout() {
  const { isAdmin, isEditMode } = useEdit()
  // Offset <main> by the admin bar height so it never sits under the fixed bar:
  //   36px  (h-9)       — admin preview mode (bar only)
  //   68px  (h-9 + h-8) — edit mode (bar + legend strip)
  const mainOffset = isAdmin ? (isEditMode ? 'pt-[68px]' : 'pt-9') : ''

  return (
    <>
      <ScrollToTop />
      <EditBar />
      <Navbar />
      <main className={mainOffset}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <EditProvider>
      <BrowserRouter>
        <LoginGate>
          <AppLayout />
        </LoginGate>
      </BrowserRouter>
    </EditProvider>
  )
}
