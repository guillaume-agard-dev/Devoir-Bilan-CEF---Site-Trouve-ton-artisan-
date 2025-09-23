-- EXEMPLE DE DONNÉES (à adapter / remplacer par les vraies données)

INSERT INTO categories (libelle, slug) VALUES
  ('Bâtiment', 'batiment'),
  ('Services', 'services'),
  ('Fabrication', 'fabrication'),
  ('Alimentation', 'alimentation');

INSERT INTO specialites (libelle) VALUES
  ('Menuisier'), ('Électricien'), ('Ferronnier'), ('Boulanger');

INSERT INTO villes (nom, departement) VALUES
  ('Lyon 6e', '69'),
  ('Villeurbanne', '69'),
  ('Vénissieux', '69');

INSERT INTO artisans (nom, a_propos, note, site_web, categorie_id, specialite_id, ville_id) VALUES
  ('Menuiserie Dupont', 'Menuiserie sur mesure depuis 1988.', 4.8, 'https://dupont-menuiserie.fr', 1, 1, 1),
  ('Élec’Pro Martin', 'Interventions rapides et installations neuves.', 4.2, NULL, 1, 2, 2),
  ('Atelier Léon', 'Ferronnerie d’art et structures métalliques.', 5.0, NULL, 3, 3, 3),
  ('Boulangerie du Parc', 'Pains au levain et viennoiseries maison.', 5.0, 'https://boulangerieduparc.fr', 4, 4, 1);

-- Regénérer la vue après import si nécessaire
-- CREATE OR REPLACE VIEW v_artisans_cards AS ...
