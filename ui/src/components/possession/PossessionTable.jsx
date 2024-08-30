import React from 'react';

function PossessionTable({ possessions, onEdit, onClose }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Taux</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map(possession => (
          <tr key={possession.id}>
            <td>{possession.nom}</td>
            <td>{possession.valeur}</td>
            <td>{possession.dateAcquisition}</td>
            <td>{possession.dateFin || 'N/A'}</td>
            <td>{possession.taux}</td>
            <td>
              <button onClick={() => onEdit(possession.id)}>Edit</button>
              <button onClick={() => onClose(possession.id)}>Close</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PossessionTable;
