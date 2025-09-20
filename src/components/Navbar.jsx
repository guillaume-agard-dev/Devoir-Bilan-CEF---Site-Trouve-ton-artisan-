import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logoUrl from "../assets/logo.png";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [term, setTerm] = useState("");

  // Fermer le menu mobile à chaque navigation
  useEffect(() => {
    const el = document.getElementById("nav");
    if (!el) return;
    if (el.classList.contains("show")) {
      const collapse =
        window.bootstrap?.Collapse.getInstance(el) ||
        (window.bootstrap ? new window.bootstrap.Collapse(el) : null);
      collapse ? collapse.hide() : el.classList.remove("show");
    }
  }, [location]);

  const navLinkClass = ({ isActive }) => `nav-link${isActive ? " active" : ""}`;

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = term.trim();
    // Redirige vers la page fiche artisans avec le terme en querystring
    navigate(q ? `/fiche-artisans?search=${encodeURIComponent(q)}` : "/fiche-artisans");
    setTerm("");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary app-navbar">
      <div className="container">
        {/* Brand = logo PNG */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logoUrl}
            alt="Trouve ton artisan"
            height="65"
            className="me-2"
          />
          <span className="visually-hidden">Trouve ton artisan</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
          aria-controls="nav"
          aria-expanded="false"
          aria-label="Basculer la navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          {/* NAV ITEMS CENTRÉS */}
          <ul className="navbar-nav mx-lg-auto mb-2 mb-lg-0 text-center">
            <li className="nav-item">
              <NavLink end className={navLinkClass} to="/">
                Accueil
              </NavLink>
            </li>

            {/* Dropdown Catégories */}
            <li className="nav-item dropdown">
              <a
                href="#"
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Catégories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="/liste-artisans#batiment">
                    Bâtiment
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/liste-artisans#services">
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/liste-artisans#fabrication">
                    Fabrication
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/liste-artisans#alimentation">
                    Alimentation
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>

          {/* Barre de recherche à droite */}
          <form
            className="d-flex align-items-center gap-2 my-2 my-lg-0 ms-lg-3"
            role="search"
            onSubmit={onSearchSubmit}
          >
            <label htmlFor="navSearch" className="visually-hidden">
              Rechercher un artisan
            </label>
            <input
              id="navSearch"
              type="search"
              className="form-control"
              placeholder="Rechercher un artisan…"
              aria-label="Rechercher un artisan"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Rechercher
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}
