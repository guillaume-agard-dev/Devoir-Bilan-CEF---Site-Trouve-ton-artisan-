
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import heroUrl from "../assets/mountains.jpg";
// plus besoin du JSON local utilisé en attendant l'intégration à la BDD MySQL
// import { getArtisansByCategory } from "../data/artisansData";
import "../styles/pages/_listeArtisans.scss";

const CATEGORIES = [
  { key: "batiment", label: "Bâtiment" },
  { key: "services", label: "Services" },
  { key: "fabrication", label: "Fabrication" },
  { key: "alimentation", label: "Alimentation" },
];

function RatingStars({ value = 0 }) {
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
          <div className="small text-muted mt-2">{artisan.specialty}</div>
          <div className="small mt-1">📍{artisan.location}</div>
          <Link to={`/fiche-artisans/${artisan.id}`} className="stretched-link" />
        </div>
      </div>
    </div>
  );
}

export default function ListeArtisans() {
  const location = useLocation();
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch depuis l'API
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_URL}/artisans`, { signal: ac.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setArtisans(Array.isArray(data) ? data : []);
      } catch (e) {
        if (e.name !== "AbortError") setError(e.message || "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    })();
    return () => ac.abort();
  }, [API_URL]);

  // Regroupement par catégorie
  const byCategory = useMemo(() => {
    const groups = Object.fromEntries(CATEGORIES.map(c => [c.key, []]));
    for (const a of artisans) if (groups[a.category]) groups[a.category].push(a);
    return groups;
  }, [artisans]);

  // Scroll vers l’ancre après chargement
  useEffect(() => {
    if (!loading && location.hash) {
      const id = location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loading, location]);

  return (
    <main>
      {/* HERO */}
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
            {loading && (
              <div className="text-center my-5">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Chargement…</span>
                </div>
              </div>
            )}

            {error && <div className="alert alert-danger">Erreur : {error}</div>}

            {!loading && !error && CATEGORIES.map((c) => (
              <section key={c.key} id={c.key} className="tth-category-section mb-5">
                <h2 className="h4 mb-3">{c.label}</h2>
                {byCategory[c.key]?.length ? (
                  <div className="row g-3 g-md-4">
                    {byCategory[c.key].map(a => <ArtisanCard key={a.id} artisan={a} />)}
                  </div>
                ) : (
                  <p className="text-muted">Aucun artisan pour cette catégorie.</p>
                )}
              </section>
            ))}

            <div className="text-end">
              <a href="#" className="small">↑ Retour en haut</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
