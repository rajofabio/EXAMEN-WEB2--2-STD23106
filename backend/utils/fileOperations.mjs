import fs, { write } from "fs";
import { fileURLToPath } from "url";

import path from "path";
import { addMonths, endOfMonth } from "date-fns";

import Flux from "../models/possessions/Flux.js";
import Patrimoine from "../models/Patrimoine.js";
import Possession from "../models/possessions/Possession.js";
import Personne from "../models/Personne.js";

const dataPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  "../data/Patrimoine.json"
);

async function writeFile(data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          resolve(JSON.parse(data));
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
};

async function getPossessions() {
  const data = await readData();
  for (const model of data) {
    if (model.model == "Patrimoine") {
      return model.data.possessions
        .map((p) => {
          if (p.jour) {
            return new Flux(
              new Personne(p.possesseur.nom),
              p.libelle,
              p.valeurConstante,
              new Date(p.dateDebut),
              p.dateFin ? new Date(p.dateFin) : null,
              p.tauxAmortissement,
              p.jour
            );
          }
          return new Possession(
            p.possesseur,
            p.libelle,
            p.valeur,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement
          );
        })
        .map((e) => {
          return { ...e, valeurActuelle: e.getValeur(new Date()) };
        });
    }
  }
}

const createPossession = async (newPossession) => {
  const data = await readData();
  const { libelle, valeur, dateDebut, tauxAmortissement } = newPossession;

  const possesseur = data.find((p) => p.model === "Personne").data;

  for (const model of data) {
    if (model.model == "Patrimoine") {
      model.data.possessions.push({
        possesseur: possesseur,
        libelle: libelle,
        valeur: valeur,
        dateDebut: dateDebut,
        dateFin: null,
        tauxAmortissement: tauxAmortissement,
      });
    }
  }
  writeFile(data);
};

const updatePossession = async (libelle, updatedPossession) => {
  const data = await readData();

  for (const model of data) {
    if (model.model === "Patrimoine") {
      const index = model.data.possessions.findIndex(
        (p) => p.libelle === libelle
      );
      model.data.possessions[index].libelle = updatedPossession.newLibelle;
      model.data.possessions[index].dateFin = updatedPossession.dateFin;
    }
  }
  writeFile(data);
};

const closePossession = async (libelle) => {
  const data = await readData();

  for (const model of data) {
    if (model.model === "Patrimoine") {
      const index = model.data.possessions.findIndex(
        (p) => p.libelle === libelle
      );
      model.data.possessions[index].dateFin = new Date().toISOString();
    }
  }
  writeFile(data);
};

const getValeurPatrimoine = async (date) => {
  const data = await readData();
  let personne;
  let possessions;
  for (const model of data) {
    if (model.model == "Personne") {
      personne = new Personne(model.data.nom);
    } else {
      possessions = model.data.possessions.map((p) => {
        if (p.jour) {
          return new Flux(
            personne,
            p.libelle,
            p.valeurConstante,
            new Date(p.dateDebut),
            p.dateFin ? new Date(p.dateFin) : null,
            p.tauxAmortissement,
            p.jour
          );
        }
        return new Possession(
          p.possesseur,
          p.libelle,
          p.valeur,
          new Date(p.dateDebut),
          p.dateFin ? new Date(p.dateFin) : null,
          p.tauxAmortissement
        );
      });
    }
  }

  const patrimoine = new Patrimoine(personne, possessions);
  return parseFloat(patrimoine.getValeur(new Date(date)).toFixed(3));
};

const getValeurPatrimoineRange = async (params) => {
  const { type, dateDebut, dateFin, jour } = params;
  const data = await readData();
  let parsedDate = new Date(dateDebut);
  let parsedDateFin = new Date(dateFin);

  const result = [];

  while (parsedDate <= parsedDateFin) {
    const endDate = endOfMonth(parsedDate).getDate();

    parsedDate = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      Math.min(jour, endDate)
    );
    result.push({
      date: parsedDate.toLocaleDateString(),
      valeur: await getValeurPatrimoine(parsedDate),
    });
    parsedDate = addMonths(parsedDate, 1);
  }
  return result;
};

export {
  getPossessions,
  createPossession,
  updatePossession,
  closePossession,
  getValeurPatrimoine,
  getValeurPatrimoineRange,
};
