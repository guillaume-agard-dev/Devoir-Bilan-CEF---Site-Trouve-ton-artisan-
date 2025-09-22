import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ListeArtisans from './pages/ListeArtisans';
import FicheArtisans from './pages/FicheArtisans';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MentionsLegales from "./pages/MentionsLegales";
import DonneesPersonnelles from "./pages/DonneesPersonnelles";
import Accessibilite from "./pages/Accessibilite";
import Cookies from "./pages/Cookies";

export default function App() {
  return (
    <>
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/liste-artisans" element={<ListeArtisans />} />
        <Route path="/fiche-artisans" element={<FicheArtisans />} />
        <Route path="/fiche-artisans/:id" element={<FicheArtisans />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/donnees-personnelles" element={<DonneesPersonnelles />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="/cookies" element={<Cookies />} />
      </Routes>
      </main>
      <Footer />
      </div>
    </>
  );
}
