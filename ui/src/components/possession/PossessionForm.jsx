import React, { useState, useEffect } from 'react';

function PossessionForm({ onSubmit, possession, isEditing }) {
  const [libelle, setLibelle] = useState(possession ? possession.nom : '');
  const [valeur, setValeur] = useState(possession ? possession.valeur : '');
  const [dateDebut, setDateDebut] = useState(possession ? possession.dateAcquisition : '');
  const [taux, setTaux] = useState(possession ? possession.taux : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ libelle, valeur, dateDebut, taux });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Libelle:
        <input type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)} required />
      </label>
      <label>
        Valeur:
        <input type="number" value={valeur} onChange={(e) => setValeur(e.target.value)} required />
      </label>
      <label>
        Date Début:
        <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} required />
      </label>
      <label>
        Taux:
        <input type="number" value={taux} onChange={(e) => setTaux(e.target.value)} required />
      </label>
      <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
    </form>
  );
}

export default PossessionForm;
