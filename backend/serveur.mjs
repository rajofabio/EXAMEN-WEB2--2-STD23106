import express from "express";
import cors from "cors";
import {
  getPossessions,
  createPossession,
  updatePossession,
  closePossession,
  getValeurPatrimoine,
  getValeurPatrimoineRange,
} from "./utils/fileOperations.mjs";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/possession", async (req, res) => {
  try {
    const possessions = await getPossessions();
    res.json(possessions);
  } catch (error) {
    console.error("Failed to get possessions:", error);
    res.status(500).json({ error: "Failed to get possessions" });
  }
});

app.post("/possession", async (req, res) => {
  try {
    const { libelle, valeur, dateDebut, tauxAmortissement } = req.body;

    await createPossession(req.body);
    res.status(201).json({ message: "Possession created" });
  } catch (error) {
    console.error("Failed to create possession:", error);
    res.status(500).json({ error: "Failed to create possession" });
  }
});

app.put("/possession/:libelle", async (req, res) => {
  try {
    await updatePossession(req.params.libelle, req.body);
    res.json({ message: "Possession updated" });
  } catch (error) {
    console.error("Failed to update possession:", error);
    res.status(500).json({ error: "Failed to update possession" });
  }
});
app.put("/possession/:libelle/close", async (req, res) => {
  try {
    await closePossession(req.params.libelle);
    res.json({ message: "Possession closed" });
  } catch (error) {
    console.error("Failed to close possession:", error);
    res.status(500).json({ error: "Failed to close possession" });
  }
});

app.get("/patrimoine/:date", async (req, res) => {
  try {
    const valeur = await getValeurPatrimoine(req.params.date);
    res.json({ valeur: valeur });
  } catch (error) {
    console.error("Failed to get patrimoine value:", error);
    res.status(500).json({ error: "Failed to get patrimoine value" });
  }
});

app.post("/patrimoine/range", async (req, res) => {
  try {
    const valeurs = await getValeurPatrimoineRange(req.body);
    res.json(valeurs);
  } catch (error) {
    console.error("Failed to get patrimoine values for range:", error);
    res
      .status(500)
      .json({ error: "Failed to get patrimoine values for range" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
