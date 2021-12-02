import React from 'react';
import './style.scss';

const AbilityEditor = ({ability, handleChange}) => {
    return (
        <div className="abilityEditor" >
            <label>{ability.name}: </label>
            <input type="number"
                max={30} min={1}
                value={ability.val} 
                onChange={handleChange} 
            />
        </div>
    );
}

export default AbilityEditor;