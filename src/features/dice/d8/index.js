import React from 'react';
import "./style.scss";

const D8Display = (props) => {
  return (
    <button className='d8-svg-button-wrapper' onClick={props.onClick} >
      <p className='d8-button-text'>{props.dieValue}</p>
      <svg className='d8-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0, 0, 110, 115">
        <g id="Layer_1">
          <path d="M5.2,28.75 L55,0 L104.8,28.75 L104.8,86.25 L55,115 L5.2,86.25 z" fill="#5669F5"/>
          <path d="M55,0 L104.8,28.75 L104.8,86.25 z" fill="#000000" opacity="0.18"/>
          <path d="M104.8,86.25 L55,115 L5.2,86.25 z" fill="#000000" opacity="0.32"/>
          <path d="M5.2,86.25 L5.2,28.75 L55,0 z" fill="#000000" opacity="0.12"/>
        </g>
      </svg>
    </button>
  );
}

export default D8Display;
