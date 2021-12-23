import React from "react";
import "./style.scss";

const AbilityEditor = ({ ability, handleChange }) => {
  const modifier = Math.floor((ability.val - 10) / 2);
  return (
    <div className="ability-editor">
      <div className="ability-name">{ability.name}</div>
      <input
        type="number"
        className="ability-input"
        max={30}
        min={1}
        value={ability.val}
        onChange={handleChange}
      />
      <div className="ability-mod">
        {modifier > 0 ? `+${modifier}` : `${modifier}`}
      </div>
    </div>
  );
};

export default AbilityEditor;
