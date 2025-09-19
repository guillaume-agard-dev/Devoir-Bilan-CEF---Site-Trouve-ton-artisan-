export default function App() {
  return (
    <div className="container py-4">
      <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-3 mb-4">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Trouve ton artisan</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"
            aria-controls="nav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#">Accueil</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Artisans</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="card">
        <div className="card-body">
          <h1 className="h4 mb-2">Hello Bootstrap 👋</h1>
          <p className="mb-3">Si ce bouton a le style Bootstrap, tout est OK.</p>
          <button className="btn btn-primary">Bouton</button>
        </div>
      </div>
    </div>
  );
}
