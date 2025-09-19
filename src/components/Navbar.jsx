import { NavLink, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function Navbar() {
  // (Optionnel) Fermer le menu mobile à chaque changement de route
  const location = useLocation();
  useEffect(() => {
    const el = document.getElementById('nav');
    if (!el) return;
    if (el.classList.contains('show')) {
      // Si Bootstrap JS est chargé, utilise son API; sinon retire juste la classe
      const collapse =
        window.bootstrap?.Collapse.getInstance(el) ||
        (window.bootstrap ? new window.bootstrap.Collapse(el) : null);
      collapse ? collapse.hide() : el.classList.remove('show');
    }
  }, [location]);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">TTA</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
          aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className={navLinkClass} to="/">Accueil</NavLink></li>
            <li className="nav-item"><NavLink className={navLinkClass} to="/liste-artisans">Liste</NavLink></li>

            <li className="nav-item dropdown">
              <button className="nav-link dropdown-toggle btn btn-link" data-bs-toggle="dropdown">
                Catégories
              </button>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/liste-artisans#batiment">Bâtiment</NavLink></li>
                <li><NavLink className="dropdown-item" to="/liste-artisans#services">Services</NavLink></li>
                <li><NavLink className="dropdown-item" to="/liste-artisans#fabrication">Fabrication</NavLink></li>
                <li><NavLink className="dropdown-item" to="/liste-artisans#alimentation">Alimentation</NavLink></li>
              </ul>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className={navLinkClass} to="/fiche-artisans">Fiche artisans</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
