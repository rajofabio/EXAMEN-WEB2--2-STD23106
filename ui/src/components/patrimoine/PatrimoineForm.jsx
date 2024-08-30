import React, { useState } from 'react';
import DatePicker from '../common/DatePicker';
import Button from '../common/Button';

function PatrimoineForm({ onSubmit }) {
  const [date, setDate] = useState('');
  const [rangeData, setRangeData] = useState({
    dateDebut: '',
    dateFin: '',
    jour: 1,
  });

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleRangeChange = (e) => {
    setRangeData({
      ...rangeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSubmit = (e) => {
    e.preventDefault();
    onSubmit({ date });
  };

  const handleRangeSubmit = (e) => {
    e.preventDefault();
    onSubmit(rangeData);
  };

  return (
    <div>
      <h2>Get Valeur Patrimoine</h2>
      <form onSubmit={handleDateSubmit}>
        <div>
          <label>Date:</label>
          <DatePicker value={date} onChange={handleDateChange} />
          <Button type="submit">Validate</Button>
        </div>
      </form>

      <h2>Get Valeur Patrimoine Range</h2>
      <form onSubmit={handleRangeSubmit}>
        <div>
          <label>Date Début:</label>
          <DatePicker
            name="dateDebut"
            value={rangeData.dateDebut}
            onChange={handleRangeChange}
          />
        </div>
        <div>
          <label>Date Fin:</label>
          <DatePicker
            name="dateFin"
            value={rangeData.dateFin}
            onChange={handleRangeChange}
          />
        </div>
        <div>
          <label>Jour:</label>
          <input
            type="number"
            name="jour"
            value={rangeData.jour}
            onChange={handleRangeChange}
            min="1"
          />
        </div>
        <Button type="submit">Validate Range</Button>
      </form>
    </div>
  );
}

export default PatrimoineForm;
