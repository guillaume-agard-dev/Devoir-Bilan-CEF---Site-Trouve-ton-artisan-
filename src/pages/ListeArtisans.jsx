
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import heroUrl from "../assets/mountains.jpg";
import { getArtisansByCategory } from "../data/artisansData";
import "../styles/pages/_listeArtisans.scss";

const CATEGORIES = [
  { key: "batiment", label: "Bâtiment" },
  { key: "services", label: "Services" },
  { key: "fabrication", label: "Fabrication" },
  { key: "alimentation", label: "Alimentation" },
];

function RatingStars({ value }) {
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < value ? "filled" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

function ArtisanCard({ artisan }) {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card h-100 shadow-sm position-relative">
        <div className="card-body">
          <h3 className="h5 card-title mb-1">{artisan.name}</h3>
          <RatingStars value={artisan.rating} />
          <div className="medium text-muted mt-2">{artisan.specialty}</div>
          <div className="small mt-1">📍{artisan.location}</div>
          <Link to={`/fiche-artisans/${artisan.id}`} className="stretched-link" />
        </div>
      </div>
    </div>
  );
}

export default function ListeArtisans() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.hash]);

  return (
    <main>
      {/* HERO (inchangé) */}
      <header className="tth-hero d-flex align-items-end" style={{ "--hero-bg": `url(${heroUrl})` }}>
        <div className="container">
          <h1 className="hero-title">Liste des artisans</h1>
        </div>
      </header>

      {/* NAV MOBILE */}
      <div className="container d-lg-none my-3">
        <ul className="nav nav-pills gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <li className="nav-item" key={c.key}>
              <a className="nav-link" href={`#${c.key}`}>{c.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <section className="container my-5">
        <div className="row">
          {/* NAV LATÉRALE STICKY */}
          <aside className="col-lg-3 d-none d-lg-block">
            <nav className="tth-sticky-nav">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h6 text-uppercase text-muted mb-3">Catégories</h2>
                  <ul className="list-unstyled mb-0">
                    {CATEGORIES.map(c => (
                      <li key={c.key} className="mb-2">
                        <a href={`#${c.key}`} className="link-underline link-underline-opacity-0 link-offset-2">
                          {c.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </aside>

          {/* CONTENU */}
          <div className="col-lg-9">
            {CATEGORIES.map((c) => {
              const items = getArtisansByCategory(c.key);
              return (
                <section key={c.key} id={c.key} className="tth-category-section mb-5">
                  <h2 className="h4 mb-3">{c.label}</h2>
                  {items.length ? (
                    <div className="row g-3 g-md-4">
                      {items.map(a => <ArtisanCard key={a.id} artisan={a} />)}
                    </div>
                  ) : (
                    <p className="text-muted">Aucun artisan pour cette catégorie.</p>
                  )}
                </section>
              );
            })}
            <div className="text-end">
              <a href="#" className="small">↑ Retour en haut</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
