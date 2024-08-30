import React from "react";

function PossessionActions({ onEdit, onClose }) {
  return (
    <div>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default PossessionActions;
