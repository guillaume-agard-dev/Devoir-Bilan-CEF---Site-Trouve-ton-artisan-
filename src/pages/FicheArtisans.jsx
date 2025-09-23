
import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import heroUrl from "../assets/mountains.jpg";
import { getArtisanById } from "../data/artisansData";
import "../styles/pages/_ficheArtisans.scss";

function RatingStars({ value }) {
  return (
    <div className="rating" aria-label={`Note ${value} sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < value ? "filled" : "empty"}`}>★</span>
      ))}
    </div>
  );
}

export default function FicheArtisans() {
  const { id } = useParams();
  const artisan = useMemo(() => getArtisanById(id), [id]);

  // Formulaire de contact
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "", botfield: "" });
  const canSendEmail = Boolean(artisan?.email);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (!canSendEmail) return;

    // Anti-bot simple (champ caché)
    if (form.botfield) return;

    const subject = form.subject || `Contact via Trouve ton artisan • ${artisan.name}`;
    const bodyLines = [
      form.message || "",
      "",
      "—",
      `De : ${form.name || "Anonyme"} <${form.email || "non-précisé"}>`,
    ];
    const mailto = `mailto:${artisan.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailto;
  };

  if (!artisan) {
    return (
      <main>
        <header className="tth-hero d-flex align-items-end" style={{ "--hero-bg": `url(${heroUrl})` }}>
          <div className="container">
            <h1 className="hero-title">Artisan introuvable</h1>
          </div>
        </header>

        <section className="container my-5">
          <div className="alert alert-warning">
            Désolé, cette fiche artisan n’existe pas.
          </div>
          <Link to="/liste-artisans" className="btn btn-primary">← Retour à la liste</Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      {/* HERO */}
      <header className="tth-hero d-flex align-items-end" style={{ "--hero-bg": `url(${heroUrl})` }}>
        <div className="container">
          <h1 className="hero-title">Mon artisan</h1>
        </div>
      </header>

      <section className="container my-5">
        <div className="row g-4">
          {/* Col gauche : visuel + infos principales */}
          <div className="col-12 col-lg-8">
            {/* Image */}
            <div className="mb-3">
              <img
                src={artisan.image}
                alt={`Photo de ${artisan.name}`}
                className="img-fluid rounded shadow-sm tth-artisan-img"
                onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} // cache si l'image manque
              />
            </div>

            {/* Titre + note */}
            <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
              <h2 className="h4 m-0">{artisan.name}</h2>
              <RatingStars value={artisan.rating} />
              <span className="small text-muted">{artisan.rating_raw.toFixed(1)} / 5</span>
            </div>

            {/* Métadonnées */}
            <ul className="list-inline text-muted mb-3">
              <li className="list-inline-item"><strong>Spécialité :</strong> {artisan.specialty || "—"}</li>
              <li className="list-inline-item ms-3"><strong>Localisation :</strong> {artisan.location || "—"}</li>
            </ul>

            {/* A propos */}
            {artisan.about && (
              <>
                <h3 className="h5">À propos</h3>
                <p>{artisan.about}</p>
              </>
            )}

            {/* Site web */}
            {artisan.website && (
              <p className="mb-0">
                <strong>Site web :</strong>{" "}
                <a href={artisan.website} target="_blank" rel="noreferrer">
                  {artisan.website}
                </a>
              </p>
            )}
          </div>

          {/* Col droite : contact */}
          <div className="col-12 col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h3 className="h6 text-uppercase text-muted mb-3">Contacter l’artisan</h3>

                {canSendEmail ? (
                  <form onSubmit={onSubmit} noValidate>
                    {/* honeypot */}
                    <input type="text" name="botfield" value={form.botfield} onChange={onChange} className="d-none" tabIndex={-1} autoComplete="off" />

                    <div className="mb-3">
                      <label className="form-label">Votre nom</label>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        value={form.name}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Votre e-mail</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        value={form.email}
                        onChange={onChange}
                        required
                        inputMode="email"
                        placeholder="vous@exemple.fr"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Objet</label>
                      <input
                        name="subject"
                        type="text"
                        className="form-control"
                        value={form.subject}
                        onChange={onChange}
                        placeholder={`Demande pour ${artisan.name}`}
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Message</label>
                      <textarea
                        name="message"
                        className="form-control"
                        rows={5}
                        value={form.message}
                        onChange={onChange}
                        required
                      />
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">
                        Envoyer un e-mail
                      </button>
                    </div>
                    <div className="form-text mt-2">
                      Votre message sera envoyé à <strong>{artisan.email}</strong> via votre logiciel de messagerie.
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="alert alert-info">
                      L’email de cet artisan n’est pas disponible pour le moment.
                    </div>
                    {artisan.website ? (
                      <a href={artisan.website} target="_blank" rel="noreferrer" className="btn btn-outline-primary w-100">
                        Visiter le site
                      </a>
                    ) : (
                      <p className="small text-muted mb-0">
                        Aucun contact disponible. Revenez plus tard.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="mt-3">
              <Link to="/liste-artisans" className="btn btn-outline-secondary btn-sm">← Retour à la liste</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
