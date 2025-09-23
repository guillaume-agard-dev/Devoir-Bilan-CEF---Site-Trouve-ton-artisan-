# Trouve ton artisan !

Projet front + API pour répertoire d'artisans avec fiches détaillées.

## 🧩 Aperçu
- **Front** : React + Vite + Bootstrap (pages : Accueil, Liste des artisans, Fiche artisan, Mentions légales, etc.).
- **Back** : Express + Sequelize.
- **Base de données** : MySQL/MariaDB (vue `v_artisans_cards`).

## ✅ Prérequis
- Node.js 18+ (recommandé 20+)
- npm 9+
- MySQL/MariaDB 10.5+
- Git

## 📦 Installation (dev local)
```bash
# cloner le dépôt
git clone <URL_DU_REPO>
cd <nom_du_dossier>

# FRONT
npm install
# API
cd api && npm install
```

## 🔐 Variables d’environnement
### Front (Vite)
Créer **.env.local** à la racine du projet front (là où il y a `index.html`) :
```
VITE_API_URL=http://localhost:3000/api
```

### API (Express / `api/.env`)
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=trouve_ton_artisan
DB_USER=root
DB_PASS=
DB_TABLE=v_artisans_cards
CORS_ORIGIN=http://localhost:5173
```

## ▶️ Démarrage
Dans **deux** terminaux :

**API**
```bash
cd api
npm run dev
# l'API répond sur http://localhost:3000/api
```

**Front**
```bash
npm run dev
# l'appli répond sur http://localhost:5173
```

## 🗄️ Base de données
- Exécuter `schema_exemple.sql` pour créer des tables d’exemple et la vue (à adapter au contexte réel).
- Exécuter `seed_exemple.sql` pour insérer des données de test.

## 🔗 Endpoints API
- `GET /api/health` → `{ ok: true }`
- `GET /api/artisans?category=<slug>&q=<nom>&limit=50&offset=0`
- `GET /api/artisans/:id`

## 🛡️ Sécurité (implémentée & conseillée)
- **CORS** avec liste blanche d’origines (implémenté).
- **Sequelize** (requêtes paramétrées, pas de SQL concaténé) (implémenté).
- Variables sensibles dans `.env` (implémenté).
- **À ajouter vivement** : `helmet`, `express-rate-limit`, validation d’entrées (Joi/Zod), logs (morgan), réponses d’erreurs neutres.

## 🚀 Build & déploiement
**Front**
```bash
npm run build
# output : dist/
```

**API**
- Déployer sur un hébergeur (Railway/Alwaysdata/o2switch). Remplir variables d’env côté hébergeur.

## 🧪 Tests rapides
```bash
curl -s http://localhost:3000/api/health
curl -s http://localhost:3000/api/artisans | head -c 400
curl -s http://localhost:3000/api/artisans/1
```

## 📄 Licence
À définir.
