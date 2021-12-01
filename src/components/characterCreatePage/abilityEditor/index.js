import React from 'react';
import './style.scss';

const AbilityEditor = ({abilityName, abilityVal, handleChange}) => {
    return (
        <div className="abilityEditor">
            <label>{abilityName}: </label>
            <input type="number"
                max="25" min="0"
                value={abilityVal} 
                onChange={({target}) => handleChange(abilityName, target.value)} 
            />
        </div>
    );
}

export default AbilityEditor;