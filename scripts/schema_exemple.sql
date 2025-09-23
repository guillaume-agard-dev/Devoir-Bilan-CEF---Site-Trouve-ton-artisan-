-- EXEMPLE DE SCHÉMA (à adapter au contexte réel)
-- ⚠️ Si vous avez déjà vos tables, utilisez cet exemple uniquement comme base documentaire.

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE specialites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  libelle VARCHAR(100) NOT NULL
);

CREATE TABLE villes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(120) NOT NULL,
  departement VARCHAR(5) NULL
);

CREATE TABLE artisans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  a_propos TEXT NULL,
  note DECIMAL(2,1) DEFAULT 0, -- 0..5
  site_web VARCHAR(255) NULL,
  categorie_id INT NOT NULL,
  specialite_id INT NULL,
  ville_id INT NULL,
  CONSTRAINT fk_artisan_categorie FOREIGN KEY (categorie_id) REFERENCES categories(id),
  CONSTRAINT fk_artisan_specialite FOREIGN KEY (specialite_id) REFERENCES specialites(id),
  CONSTRAINT fk_artisan_ville FOREIGN KEY (ville_id) REFERENCES villes(id)
);

-- Vue compatible avec l'API/front (colonnes d'après votre JSON)
CREATE OR REPLACE VIEW v_artisans_cards AS
SELECT
  a.id,
  a.nom,
  v.nom AS ville,
  a.a_propos,
  a.note,
  a.site_web,
  s.libelle AS specialites,
  c.libelle AS domaines
FROM artisans a
JOIN categories c ON c.id = a.categorie_id
LEFT JOIN specialites s ON s.id = a.specialite_id
LEFT JOIN villes v ON v.id = a.ville_id;
