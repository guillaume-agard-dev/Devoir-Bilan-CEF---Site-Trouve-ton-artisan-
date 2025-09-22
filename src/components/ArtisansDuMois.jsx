import React from "react";
import { Link } from "react-router-dom";

// Small SVG star utilities (no external icons needed)
function Star({ type = "empty", size = 18 }) {
  const baseProps = { width: size, height: size, viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" };
  const starPath = (
    <path d="M12 2.25l2.955 5.985 6.605.96-4.78 4.657 1.127 6.57L12 17.865l-5.907 3.556 1.127-6.57-4.78-4.657 6.605-.96L12 2.25z" />
  );

  if (type === "full") {
    return (
      <svg {...baseProps} aria-hidden="true" role="img" style={{ color: "#ffc107" }}>
        {React.cloneElement(starPath, { fill: "currentColor" })}
      </svg>
    );
  }

  if (type === "half") {
    return (
      <span style={{ position: "relative", display: "inline-block", width: size, height: size }} aria-hidden="true">
        {/* Outline */}
        <svg {...baseProps} style={{ position: "absolute", inset: 0, color: "#e0e0e0" }}>
          {React.cloneElement(starPath, { fill: "currentColor" })}
        </svg>
        {/* Left half filled */}
        <span style={{ position: "absolute", inset: 0, width: size / 2, overflow: "hidden" }}>
          <svg {...baseProps} style={{ color: "#ffc107" }}>
            {React.cloneElement(starPath, { fill: "currentColor" })}
          </svg>
        </span>
      </span>
    );
  }

  // empty
  return (
    <svg {...baseProps} aria-hidden="true" role="img" style={{ color: "#e0e0e0" }}>
      {React.cloneElement(starPath, { fill: "currentColor" })}
    </svg>
  );
}

function Stars({ value = 0, size = 18 }) {
  const full = Math.floor(value);
  const decimal = value - full;
  const hasHalf = decimal >= 0.25 && decimal < 0.75; // show half between 0.25 and <0.75
  const fullCount = hasHalf ? full : Math.round(value);
  const emptyCount = 5 - fullCount - (hasHalf ? 1 : 0);

  const items = [];
  for (let i = 0; i < fullCount; i++) items.push(<Star key={`f${i}`} type="full" size={size} />);
  if (hasHalf) items.push(<Star key="half" type="half" size={size} />);
  for (let i = 0; i < emptyCount; i++) items.push(<Star key={`e${i}`} type="empty" size={size} />);

  return (
    <div className="d-inline-flex align-items-center" aria-label={`Note ${value}/5`}>
      {items}
    </div>
  );
}

export default function ArtisansDuMois() {
  // 👉 Modifie ici tes 3 artisans du mois
  const featured = [
    { id: 5, nom: "Orville Salmons", note: 5, specialite: "Chauffagiste", ville: "Evian" },
    { id: 11, nom: "Ernest Carignan", note: 5, specialite: "Ferronier", ville: "Le-Puy-en-Velay" },
    { id: 3, nom: "Chocolaterie Labbé", note: 4.9, specialite: "Chocolatier", ville: "Lyon" },
  ];

  return (
    <section className="artisans-du-mois py-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <h2 className="h3 mb-0">Nos artisans du mois</h2>
          <Link to="/liste-artisans" className="btn btn-outline-primary btn-sm">Voir tous</Link>
        </div>

        <div className="row g-4">
          {featured.map((a) => (
            <div className="col-12 col-md-6 col-lg-4" key={a.id}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h5 mb-1">{a.nom}</h3>
                  <div className="mb-2">
                    <Stars value={a.note} size={18} />
                    <small className="text-muted ms-2">{a.note.toFixed(1)}/5</small>
                  </div>
                  <div className="small text-primary fw-semibold mb-1">{a.specialite}</div>
                  <div className="small text-muted">📍 {a.ville}</div>
                </div>
                <div className="card-footer bg-transparent border-0 pt-0">
                  <Link className="stretched-link" to={`/artisans/${a.id}`}>Voir la fiche</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
