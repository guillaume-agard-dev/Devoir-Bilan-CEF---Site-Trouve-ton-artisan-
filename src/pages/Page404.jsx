import { Link, useLocation } from "react-router-dom";
import heroUrl from "../assets/mountains.jpg";

export default function Page404() {
  const { pathname } = useLocation();

  return (
    <main>
      {/* HERO */}
      <header
        className="tth-hero d-flex align-items-end"
        style={{ "--hero-bg": `url(${heroUrl})` }}
      >
        <div className="container">
          <h1 className="hero-title">Page non trouvée</h1>
        </div>
      </header>

      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="text-center py-4">
              <p className="lead mb-1">
                La page que vous avez demandée n’est pas accessible ou n’existe pas.
              </p>
              <p className="text-muted mb-3">
                Chemin demandé : <code>{pathname}</code>
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <Link to="/" className="btn btn-primary">
                  ← Retour à l’accueil
                </Link>
                <Link to="/liste-artisans" className="btn btn-outline-secondary">
                  Voir la liste des artisans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
