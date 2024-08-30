import { updatePossession } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

function UpdatePossessionPage() {
  const { libelle } = useParams();
  const [newLibelle, setNewLibelle] = useState(libelle);
  const [dateFin, setDateFin] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await updatePossession(libelle, {
      newLibelle: newLibelle,
      dateFin: dateFin,
    });
    navigate("/possession");
  };

  return (
    <div>
      <h1>Update Possession {libelle}</h1>
      <div className="d-flex flex-column col-5 gap-2">
        <input
          type="text"
          onChange={(e) => setNewLibelle(e.target.value)}
          value={newLibelle}
          className="form-control"
        />
        <input
          type="date"
          value={dateFin}
          className="form-control"
          onChange={(e) => setDateFin(e.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-primary">
          Update
        </button>
      </div>
    </div>
  );
}

export default UpdatePossessionPage;
