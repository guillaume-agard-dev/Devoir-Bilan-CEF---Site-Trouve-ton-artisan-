import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisans from './pages/FicheArtisans';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liste-artisans" element={<ListeArtisans />} />
        <Route path="/fiche-artisans" element={<FicheArtisans />} />
      </Routes>
    </>
  );
}
