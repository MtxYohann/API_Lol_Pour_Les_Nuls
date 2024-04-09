import express from "express";
import {
  createChampion,
  deleteChampion,
  getChampion,
  getChampions,
  udpateChampion,
} from "../controller/champions.js";

const router = express.Router();

// GET http://localhost:3001/Champions
router.get("/", getChampions);

// GET http://localhost:3001/Champions/1
router.get("/:id", getChampion);

// POST http://localhost:3001/Champions
router.post("/", createChampion);

// PUT http://localhost:3001/Champions/1 creer une route qui
// permet de modiier une voiture
router.put("/:id", udpateChampion);

// DELETE http://localhost:3001/Champions/1 creer une route qui
// permet de supprimer une voiture
router.delete("/:id", deleteChampion);

// Ceci est un export default, on peut en avoir
// qu'un seul par fichier (module)
export default router;