import React, { useState } from "react";
import { createPossession } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreatePossessionPage() {
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [tauxAmortissement, setTaux] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const newPossession = { libelle, valeur, dateDebut, tauxAmortissement };
      await createPossession(newPossession);
      navigate("/possession");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-6 d-flex flex-column gap-3">
      <h1>Create New Possession</h1>
      <input required
        type="text"
        placeholder="Libelle"
        value={libelle}
        className="form-control"
        onChange={(e) => setLibelle(e.target.value)}
      />
      <input required
        type="number"
        placeholder="Valeur"
        className="form-control"
        value={valeur}
        onChange={(e) => setValeur(e.target.value)}
      />
      <input required
        type="date"
        className="form-control"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
      />
      <input required
        type="number"
        placeholder="Taux"
        value={tauxAmortissement}
        className="form-control"
        onChange={(e) => setTaux(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>Create</button>
    </div>
  );
}

export default CreatePossessionPage;
