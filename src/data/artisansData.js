// src/data/artisansData.js
import raw from "./v_artisans_cards.json";

// --- utilitaires
const slugify = (s) =>
  (s ?? "")
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// phpMyAdmin export → on récupère la table v_artisans_cards.data[]
function extractRows(rawJson) {
  if (Array.isArray(rawJson)) {
    const table = rawJson.find(
      (x) => x?.type === "table" && x?.name === "v_artisans_cards"
    );
    if (table?.data && Array.isArray(table.data)) return table.data;
  }
  // fallback : si jamais c'est déjà un tableau de lignes
  return Array.isArray(rawJson) ? rawJson : [];
}

// map “Domaines” (labels FR) → slugs utilisés par ton front
function mapCategory(label) {
  const x = (label ?? "").toString().toLowerCase();
  if (x.includes("bât") || x.includes("bat")) return "batiment";
  if (x.includes("serv")) return "services";
  if (x.includes("fab")) return "fabrication";
  if (x.includes("ali")) return "alimentation";
  return slugify(x);
}

// Normalisation d’une ligne de la vue → shape pour tes cards/pages
function normalize(row) {
  const note = Number.parseFloat(row.note ?? "0") || 0; // ex: "4.5"
  const rating = Math.round(note); // étoiles pleines 0..5
  const name = row.nom ?? "Sans nom";
  return {
    id: Number(row.id),
    name,
    rating,             // entier 0..5 (pour le composant étoiles simple)
    rating_raw: note,   // conserve la décimale si tu veux des demi-étoiles plus tard
    specialty: row.specialites ?? "",
    location: row.ville ?? "",
    category: mapCategory(row.domaines),
    slug: slugify(name),
    website: row.site_web ?? "",
    about: row.a_propos ?? "",
  };
}

// données prêtes à l’emploi
const _rows = extractRows(raw).map(normalize);

// fonctions utilitaires (communes aux pages)
export function getArtisans() {
  // tri par note décroissante puis nom (stable)
  return [..._rows].sort(
    (a, b) => b.rating_raw - a.rating_raw || a.name.localeCompare(b.name)
  );
}

export function getArtisansByCategory(categorySlug) {
  return getArtisans().filter((a) => a.category === categorySlug);
}

export function getArtisanById(id) {
  return _rows.find((a) => a.id === Number(id)) || null;
}

// Option : artisans “mis en avant” — en dur (remplace par tes IDs choisis)
const FEATURED_IDS = [1, 5, 7]; // <- à adapter si tu veux choisir précisément
export function getFeaturedArtisans(count = 3) {
  const map = new Map(_rows.map((a) => [a.id, a]));
  const chosen = FEATURED_IDS.map((id) => map.get(id)).filter(Boolean);
  if (chosen.length >= count) return chosen.slice(0, count);
  // sinon complète avec les mieux notés
  const top = getArtisans().filter((a) => !FEATURED_IDS.includes(a.id));
  return [...chosen, ...top].slice(0, count);
}
