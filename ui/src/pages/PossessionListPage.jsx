import React, { useEffect, useState } from "react";
import { getPossessions, closePossession } from "../services/api";
import { useNavigate } from "react-router-dom";

function PossessionListPage() {
  const [possessions, setPossessions] = useState([]);
  const navigate = useNavigate();

  const fetchPossessions = async () => {
    const response = await getPossessions();
    setPossessions(response.data);
  };
  useEffect(() => {
    fetchPossessions();
  }, []);

  const handleClosePossession = async (libelle) => {
    await closePossession(libelle);
    fetchPossessions();
  };

  return (
    <div className="container-fluid">
      <h1>List of Possessions</h1>
      <button
        onClick={() => navigate("/possession/create")}
        className="btn btn-primary"
      >
        Create Possession
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Libelle</th>
            <th scope="col">Valeur</th>
            <th scope="col">Date Début</th>
            <th scope="col">Date Fin</th>
            <th scope="col">Taux</th>
            <th scope="col">Valeur Actuelle</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((pos) =>
            pos.jour ? (
              <tr key={pos.libelle}>
                <td>{pos.libelle}</td>
                <td>{pos.valeurConstante}</td>
                <td>{new Date(pos.dateDebut).toLocaleDateString()}</td>
                <td>
                  {pos.dateFin
                    ? new Date(pos.dateFin).toLocaleDateString()
                    : "-----------"}
                </td>
                <td>{pos.tauxAmortissement || 0}%</td>
                <td>{pos.valeurActuelle}</td>
                <td>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() =>
                      navigate(`/possession/${pos.libelle}/update`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClosePossession(pos.libelle)}
                  >
                    Close
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={pos.libelle}>
                <td>{pos.libelle}</td>
                <td>{pos.valeur}</td>
                <td>{new Date(pos.dateDebut).toLocaleDateString()}</td>
                <td>
                  {pos.dateFin
                    ? new Date(pos.dateFin).toLocaleDateString()
                    : "-----------"}
                </td>
                <td>{pos.tauxAmortissement || 0}%</td>
                <td>{pos.valeurActuelle}</td>
                <td>
                  <button
                    className="btn btn-secondary mx-2"
                    onClick={() =>
                      navigate(`/possession/${pos.libelle}/update`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleClosePossession(pos.libelle)}
                  >
                    Close
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PossessionListPage;
