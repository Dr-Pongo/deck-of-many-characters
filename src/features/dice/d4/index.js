import React from 'react';
import "./style.scss";

const D4Display = (props) => {

  return (
    <button className='d4-svg-button-wrapper' onClick={props.onClick} >
      <p className='d4-button-text'>{props.dieValue}</p>
      <svg className='d4-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0, 0, 110, 115">
        <g id="d4-1">
          <path d="M103.75,97.72 L55,13.28 L6.25,97.72 z" fill="#5669F5"/>
        </g>
      </svg>
    </button>
  );
}

export default D4Display;