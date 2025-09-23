/* eslint-env node */
import { Router } from "express";
import Artisan from "../models/Artisan.js";

const router = Router();

const slugify = (s) =>
  (s ?? "")
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const mapCategory = (label) => {
  const x = (label ?? "").toLowerCase();
  if (x.includes("bat")) return "batiment";
  if (x.includes("serv")) return "services";
  if (x.includes("fab")) return "fabrication";
  if (x.includes("ali")) return "alimentation";
  return slugify(x);
};

const normalize = (row) => {
  const note = parseFloat(row.note ?? "0") || 0;
  const rating = Math.round(note);
  const name = row.nom ?? "Sans nom";
  const slug = slugify(name);
  return {
    id: Number(row.id),
    name,
    rating,
    rating_raw: note,
    specialty: row.specialites ?? "",
    location: row.ville ?? "",
    category: mapCategory(row.domaines),
    slug,
    website: row.site_web ?? "",
    about: row.a_propos ?? ""
  };
};

// GET /api/artisans?category=batiment&limit=30&offset=0&q=dupont
router.get("/artisans", async (req, res) => {
  try {
    const { category, q, limit = 200, offset = 0 } = req.query;

    const rows = await Artisan.findAll({
      raw: true,
      order: [["nom", "ASC"]],
      offset: Number(offset),
      limit: Number(limit)
    });

    let data = rows.map(normalize);

    if (category) data = data.filter(a => a.category === category);

    if (q) {
      const nq = q.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
      data = data.filter(a =>
        a.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(nq)
      );
    }

    // Tri final : note desc, puis nom
    data.sort((a, b) => (b.rating_raw - a.rating_raw) || a.name.localeCompare(b.name));

    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

// GET /api/artisans/:id
router.get("/artisans/:id", async (req, res) => {
  try {
    const row = await Artisan.findByPk(req.params.id, { raw: true });
    if (!row) return res.status(404).json({ error: "NOT_FOUND" });
    res.json(normalize(row));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "SERVER_ERROR" });
  }
});

export default router;
