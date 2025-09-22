import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import heroUrl from "../assets/mountains.jpg";
import "../styles/pages/_listeArtisans.scss";

// ---- Catégories (clé = anchor, label = affichage)
const CATEGORIES = [
  { key: "batiment", label: "Bâtiment" },
  { key: "services", label: "Services" },
  { key: "fabrication", label: "Fabrication" },
  { key: "alimentation", label: "Alimentation" },
];

// ---- Données de base (Phase 1 - mock)
// id, name, rating (0-5), specialty, location, category (clé), slug
const MOCK_ARTISANS = [
  { id: 1, name: "Menuiserie Dupont", rating: 5, specialty: "Menuisier", location: "Lyon (69)", category: "batiment", slug: "menuiserie-dupont" },
  { id: 2, name: "Élec’Pro Martin", rating: 4, specialty: "Électricien", location: "Villeurbanne (69)", category: "batiment", slug: "elecpro-martin" },
  { id: 3, name: "Service+ Ménage", rating: 4, specialty: "Aide à domicile", location: "Bron (69)", category: "services", slug: "service-plus-menage" },
  { id: 4, name: "Atelier Léon", rating: 5, specialty: "Ferronnier", location: "Vénissieux (69)", category: "fabrication", slug: "atelier-leon" },
  { id: 5, name: "Boulangerie du Parc", rating: 5, specialty: "Boulanger", location: "Lyon 6e (69)", category: "alimentation", slug: "boulangerie-du-parc" },
  { id: 6, name: "Plomberie Express", rating: 3, specialty: "Plombier", location: "Oullins (69)", category: "batiment", slug: "plomberie-express" },
];

// ---- Composant étoiles (0 à 5)
function RatingStars({ value }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {stars.map((filled, idx) => (
        <span key={idx} className={`star ${filled ? "filled" : "empty"}`} role="img" aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

// ---- Card artisan
function ArtisanCard({ artisan }) {
  return (
    <div className="col-12 col-md-6 col-xl-4">
      <div className="card h-100 shadow-sm position-relative">
        <div className="card-body">
          <h3 className="h5 card-title mb-1">{artisan.name}</h3>
          <RatingStars value={artisan.rating} />
          <div className="small text-muted mt-2">{artisan.specialty}</div>
          <div className="small mt-1">{artisan.location}</div>
          {/* Lien étendu pour rendre toute la card cliquable */}
          <Link
            to={`/fiche-artisans/${artisan.id}`}
            className="stretched-link"
            aria-label={`Voir la fiche de ${artisan.name}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function ListeArtisans() {
  // ---- Phase 1: on part sur le mock
  const [artisans, setArtisans] = useState(MOCK_ARTISANS);

  // ---- (Optionnel) Phase 2: prêt pour brancher l’API
  // const API_URL = import.meta.env.VITE_API_URL;
  // useEffect(() => {
  //   fetch(`${API_URL}/artisans`)
  //     .then((r) => r.json())
  //     .then((data) => setArtisans(data))
  //     .catch((e) => console.error(e));
  // }, [API_URL]);

  // Regroupement par catégorie
  const byCategory = useMemo(() => {
    const groups = Object.fromEntries(CATEGORIES.map(c => [c.key, []]));
    for (const a of artisans) {
      if (groups[a.category]) groups[a.category].push(a);
    }
    return groups;
  }, [artisans]);

  // Gérer le scroll vers l’ancre si on arrive depuis /liste-artisans#services
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location]);

  return (
    <main>
      {/* HERO (inchangé) */}
      <header
        className="tth-hero d-flex align-items-end"
        style={{ "--hero-bg": `url(${heroUrl})` }}
      >
        <div className="container">
          <h1 className="hero-title">Liste des artisans</h1>
        </div>
      </header>

      {/* NAV MOBILE (pills) */}
      <div className="container d-lg-none my-3">
        <ul className="nav nav-pills gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <li className="nav-item" key={c.key}>
              <a className="nav-link" href={`#${c.key}`}>{c.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <section className="container my-5">
        <div className="row">
          {/* NAV LATÉRALE STICKY (desktop) */}
          <aside className="col-lg-3 d-none d-lg-block">
            <nav className="tth-sticky-nav">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h2 className="h6 text-uppercase text-muted mb-3">Catégories</h2>
                  <ul className="list-unstyled mb-0">
                    {CATEGORIES.map((c) => (
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
            {CATEGORIES.map((c) => (
              <section key={c.key} id={c.key} className="tth-category-section mb-5">
                <h2 className="h4 mb-3">{c.label}</h2>

                {byCategory[c.key]?.length ? (
                  <div className="row g-3 g-md-4">
                    {byCategory[c.key].map((a) => (
                      <ArtisanCard key={a.id} artisan={a} />
                    ))}
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
