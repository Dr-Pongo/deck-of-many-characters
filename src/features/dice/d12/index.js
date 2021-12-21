import React from 'react';
import "./style.scss";

const D12Display = (props) => {
  const vantageRoll = props.dieValue < 0 ? '-unused-roll' : '';
  return (
    <button className='button-wrapper' onClick={props.onClick} >
      <p className='d12-button-text'>{Math.abs(props.dieValue)}</p>
      <svg className='d12-svg' xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0, 0, 110, 115">
        <g id="Layer_1">
          <path id={`die-path${vantageRoll}`} d="M0.31,39.73 L21.2,11 L55,0 L88.8,11 L109.69,39.75 L109.69,75.27 L88.8,104 L55,115 L21.2,104 L0.31,75.27 z" />
          <path d="M96.46,44.03 L109.69,39.73 L88.8,10.98 L55,0 L55,13.91 L96.46,44.03 z" fill="#000000" opacity="0.18"/>
          <path d="M55,13.91 L55,0 L21.2,10.98 L0.31,39.73 L13.54,44.03 L55,13.91 z" fill="#000000" opacity="0.18"/>
          <path d="M13.54,44.03 L0.31,39.73 L0.32,75.27 L21.2,104.02 L29.38,92.77 L13.54,44.03 z" fill="#000000" opacity="0.1"/>
          <path d="M29.38,92.77 L21.2,104.02 L55,115 L88.8,104.02 L80.62,92.77 L29.38,92.77 z" fill="#000000" opacity="0.32"/>
          <path d="M80.62,92.77 L88.8,104.02 L109.69,75.27 L109.69,39.73 L96.46,44.03 L80.62,92.77 z" fill="#000000" opacity="0.1"/>
        </g>
      </svg>
    </button>
  );
}

export default D12Display;