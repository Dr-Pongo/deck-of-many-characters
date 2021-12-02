import React from 'react';
import './style.scss';

const SkillEditor = ({skill, handleChange}) => {
    const calculatedValue = () => {
        return "69";
    };

    return (
        <div className="skillEditor">
            <h4>{skill.name}: </h4>
            <label for="prof">Proficient: </label>
                <input id="prof"
                    type="radio"
                />
            <label for="expert">Expert: </label>
                <input id="expert"
                    type="radio"
                    
                />
            <p>{calculatedValue()}</p>
            {/* 
                TODO: 
                    Include non editable number val to show adjusted roll based on Prof and Exp
                    This number can be a local state calculated from ability number and Prof number
                    which means it will need those values! 
             */}
        </div>
        
    );
}

export default SkillEditor;