import React from "react";

const D4Display = (props) => {
  return (
    <div className="dice-wrapper" onClick={props.onClick}>
      <p id="d4-text" className="dice-text">
        {Math.abs(props.dieValue)}
      </p>
      <svg
        className="d4-svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0"
        y="0"
        viewBox="0, 0, 110, 115"
      >
        <g id="d4-1">
          <path
            className={props.dieValue < 0 ? "unused-roll" : "used-roll"}
            d="M103.75,97.72 L55,13.28 L6.25,97.72 z"
          />
        </g>
      </svg>
    </div>
  );
};

export default D4Display;
