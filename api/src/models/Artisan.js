/* eslint-disable no-undef */
/* eslint-env node */
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Artisan = sequelize.define("Artisan", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  nom: DataTypes.STRING,
  ville: DataTypes.STRING,
  a_propos: DataTypes.TEXT,
  note: DataTypes.STRING,        // ex "4.8"
  site_web: DataTypes.STRING,
  specialites: DataTypes.STRING, // ex "Menuisier"
  domaines: DataTypes.STRING     // ex "Bâtiment"
}, {
  tableName: process.env.DB_TABLE || "v_artisans_cards",
  timestamps: false,
  freezeTableName: true
});

export default Artisan;
