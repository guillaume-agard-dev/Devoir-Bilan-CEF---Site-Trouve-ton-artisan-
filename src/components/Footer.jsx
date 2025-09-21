import { Link } from "react-router-dom";
import "../styles/components/_footer.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer text-white mt-5" role="contentinfo">
      {/* Bloc principal, centré */}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 text-center">
            <h2 className="h5 fw-semibold mb-1">Trouve ton artisan&nbsp;!</h2>
            <p className="mb-2 small opacity-75">Antenne de Lyon</p>

            <address className="mb-3 small lh-lg">
              101 cours Charlemagne<br />
              CS 20033<br />
              69269 LYON CEDEX 02<br />
              France
            </address>

            <p className="mb-0">
              <a
                href="tel:+33426734000"
                className="link-light text-decoration-underline"
                aria-label="Téléphone : +33 4 26 73 40 00"
              >
                +33 (0)4 26 73 40 00
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Barre légale bas de footer, centrée */}
      <div className="footer-bottom">
        <div className="container py-3">
          <ul className="nav justify-content-center small">
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/mentions-legales">
                Mentions légales
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/donnees-personnelles">
                Données personnelles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/accessibilite">
                Accessibilité
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link px-2 link-light" to="/cookies">
                Cookies
              </Link>
            </li>
          </ul>

          <p className="text-center small mb-0 opacity-75">© {year} Trouve ton artisan&nbsp;!</p>
        </div>
      </div>
    </footer>
  );
}
