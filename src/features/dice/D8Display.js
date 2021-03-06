import React from "react";

const D8Display = (props) => {
  const deriveClassName = () => {
    if (!props.isRollResult) return "dice-wrapper";
    return props.dieValue < 0
      ? "dice-wrapper adv-hide"
      : "dice-wrapper adv-top";
  };
  return (
    <div className={deriveClassName()} onClick={props.onClick}>
      <p id="d8-text" className="dice-text">
        {Math.abs(props.dieValue)}
      </p>
      <svg
        className="d8-svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0"
        y="0"
        viewBox="0, 0, 110, 115"
      >
        <g id="Layer_1">
          <path
            className={props.dieValue < 0 ? "unused-roll" : "used-roll"}
            d="M5.2,28.75 L55,0 L104.8,28.75 L104.8,86.25 L55,115 L5.2,86.25 z"
          />
          <path
            d="M55,0 L104.8,28.75 L104.8,86.25 z"
            fill="#000000"
            opacity="0.18"
          />
          <path
            d="M104.8,86.25 L55,115 L5.2,86.25 z"
            fill="#000000"
            opacity="0.32"
          />
          <path
            d="M5.2,86.25 L5.2,28.75 L55,0 z"
            fill="#000000"
            opacity="0.12"
          />
        </g>
      </svg>
    </div>
  );
};

export default D8Display;
