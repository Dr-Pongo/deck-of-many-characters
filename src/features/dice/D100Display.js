import React from 'react';

const D100Display = (props) => {
  return (
    <button className='button-wrapper' onClick={props.onClick} >
      <p className='button-text'>{Math.abs(props.dieValue)}</p>
      <svg className='d100-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0, 0, 110, 115">
        <g id="Layer_1">
          <path className={props.dieValue < 0 ? 'unused-roll' : 'used-roll'} d="M0,44.55 L55,6.87 L110,44.55 L109,79.27 L55,108.13 L1,79.27 z" />
          <path d="M19.8,83.14 L55,6.87 L0,44.55 L1,79.27 z" fill="#000000" opacity="0.12"/>
          <path d="M90.2,83.14 L55,6.87 L110,44.55 L109,79.27 z" fill="#000000" opacity="0.18"/>
          <path d="M1,79.27 C1,79.27 19.6,83.14 19.82,83.14 C20.04,83.14 55,101.29 55,101.29 L55,108.13 z" fill="#000000" opacity="0.32"/>
          <path d="M109,79.27 C109,79.27 90.4,83.14 90.18,83.14 C89.96,83.14 55,101.29 55,101.29 L55,108.13 z" fill="#000000" opacity="0.32"/>
        </g>
      </svg>
    </button>
  );
}

export default D100Display;