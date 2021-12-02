import React from 'react';
import './style.scss';

const SkillEditor = ({skill, handleChange}) => {
    return (
        <div className="skillEditor">
            <h5>{skill.name}</h5>
            <label for="prof">Proficient 
                <input id="prof"
                    type="radio"
                />
            </label>
            <label for="expert">Expert 
                <input id="expert"
                    type="radio"
                />
            </label>
        </div>
    );
}

export default SkillEditor;