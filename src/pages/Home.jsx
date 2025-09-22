import React from "react";
import heroUrl from "../assets/mountains.jpg";
import "../styles/pages/_home.scss";
import { Link } from "react-router-dom";
import { getFeaturedArtisans } from "../data/artisansData";

function RatingStars({ value }) {
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < value ? "filled" : "empty"}`}>★</span>
      ))}
    </div>
  );
}


export default function Home() {
  const steps = [
    {
      n: 1,
      text: "1. Choisir la catégorie d’artisanat dans le menu.",
      chips: ["Bâtiment", "Services", "Fabrication", "Alimentation"],
    },
    {
      n: 2,
      text: "2. Choisir un artisan.",
      icon: "/icons/artisan.png",
      iconAlt: "Artisan",
    },
    {
      n: 3,
      text: "3. Le contacter via le formulaire de contact.",
      icon: "/icons/formulaire-de-contact.png",
      iconAlt: "Formulaire de contact",
    },
    {
      n: 4,
      text: "4. Une réponse sera apportée sous 48h.",
      icon: "/icons/faq.png",
      iconAlt: "Question/Réponse",
    },
  ];

  const featured = getFeaturedArtisans(3);

  return (
    <main>
      {/* HERO */}
      <header
        className="tth-hero d-flex align-items-end"
        style={{ "--hero-bg": `url(${heroUrl})` }}
      >
        <div className="container">
          <h1 className="hero-title">Comment trouver mon artisan ?</h1>
        </div>
      </header>

      {/* STEPS */}
      <section className="how py-5">
        <div className="container">
          <ol className="list-unstyled m-0 p-0 row gy-4 justify-content-center">
            {steps.map((s) => (
              <li key={s.n} className="col-12 col-lg-10">
                <div className="step-block">
                  <div className="step-left">
                    <div className="step-line">
                      {/* <span className="num">{s.n}.</span> */}
                      <p className="text m-0">{s.text}</p>
                    </div>
                  </div>

                  <div className="step-right">
                    {s.chips ? (
                      <div className="chips chips-grid">
                        {s.chips.map((c) => (
                          <span key={c} className="chip">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : s.icon ? (
                      <div className="illu">
                        <img
                          src={s.icon}
                          alt={s.iconAlt || ""}
                          loading="lazy"
                          width="100"
                          height="100"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container my-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 m-0">Nos artisans du mois</h2>
          <Link to="/liste-artisans" className="medium">Voir tous les artisans →</Link>
        </div>

        <div className="row g-3 g-md-4">
          {featured.map(a => (
            <div key={a.id} className="col-12 col-md-6 col-xl-4">
              <div className="card h-100 shadow-sm position-relative">
                <div className="card-body">
                  <h3 className="h5 card-title mb-1">{a.name}</h3>
                  <RatingStars value={a.rating} />
                  <div className="medium text-muted mt-2">{a.specialty}</div>
                  <div className="medium mt-1">📍{a.location}</div>
                  <Link to={`/fiche-artisans/${a.id}`} className="stretched-link" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
