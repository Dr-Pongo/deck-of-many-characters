import React from 'react';
import './style.scss';

const SkillEditor = ({skill, handleChange}) => {
    const calculatedValue = () => {
        return "69";
    };

    return (
        <div className="skillEditor">
            <h4>{skill.name}: </h4>
            <label className="buttonLabel" >Proficient: </label>
                <input id="prof"
                    type="radio"
                />
            <label className="buttonLabel" >Expert: </label>
                <input id="expert"
                    type="radio"
                    
                />
            <p>{calculatedValue()}</p>
            {/* 
                TODO: 
                    Include non editable number val to show adjusted roll based on Prof and Exp
                    This number can be a local state calculated from ability number and Prof number
                    which means it will need those values! 

                    -- Do buttons instead of inputs(radio) for cute factor
             */}
        </div>
        
    );
}

export default SkillEditor;