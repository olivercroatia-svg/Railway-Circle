import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';
import './i18n';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Contact from './pages/Contact/Contact';

function LoadingScreen() {
  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#08090d'}}>
      <svg width="40" height="40" viewBox="0 0 28 28" fill="none" style={{animation:'spin 1.5s linear infinite'}}>
        <circle cx="14" cy="14" r="13" stroke="#e8b04b" strokeWidth="1.5" strokeDasharray="60" strokeDashoffset="20"/>
        <circle cx="14" cy="14" r="4" fill="#e8b04b"/>
      </svg>
      <style>{'@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }'}</style>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Suspense fallback={<LoadingScreen />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
}
