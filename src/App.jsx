import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar       from './components/Navbar';
import WelcomeModal from './components/WelcomeModal';
import HomePage     from './pages/HomePage';
import BrowsePage   from './pages/BrowsePage';
import ProblemPage  from './pages/ProblemPage';
import ContactPage  from './pages/ContactPage';
import { Analytics } from "@vercel/analytics/react"

export default function App() {
  const [user,      setUser]      = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ac_user');
    if (saved) setUser(JSON.parse(saved));
    else       setShowModal(true);
  }, []);

  const handleModalClose = (userData) => {
    setUser(userData);
    setShowModal(false);
  };

  return (
    <HashRouter>
      {showModal && <WelcomeModal onClose={handleModalClose} />}
      <Navbar user={user} />
      <Routes>
        <Route path="/"            element={<HomePage user={user} />} />
        <Route path="/browse"      element={<BrowsePage />} />
        <Route path="/problem/:id" element={<ProblemPage />} />
        <Route path="/contact"     element={<ContactPage />} />
        <Route path="*"            element={<HomePage user={user} />} />
      </Routes>
    </HashRouter>
  );
}