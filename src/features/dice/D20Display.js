import React from "react";

const D20Display = (props) => {
  const deriveClassName = () => {
    if (!props.isRollResult) return "dice-wrapper";
    return props.dieValue < 0
      ? "dice-wrapper adv-hide"
      : "dice-wrapper adv-top";
  };
  return (
    <div className={deriveClassName()} onClick={props.onClick}>
      <p id="d20-text" className="dice-text">
        {Math.abs(props.dieValue)}
      </p>
      <svg
        className="d20-svg"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0"
        y="0"
        viewBox="0, 0, 110, 115"
      >
        <g id="Layer_1">
          <path
            className={props.dieValue < 0 ? "unused-roll" : "used-roll"}
            d="M104.95,28.5 L104.65,85.99 L54.99,115 L5.36,85.99 L5.06,28.5 L54.99,0 L104.95,28.5 z"
          />
          <path
            d="M54.99,115 L89.8,77.43 L20.18,77.43 L54.99,115 z"
            fill="#000000"
            opacity="0.25"
          />
          <path
            d="M104.94,28.5 L54.99,17.14 L89.8,77.43 L104.94,28.5 z"
            fill="#000000"
            opacity="0.15"
          />
          <path
            d="M5.05,28.5 L20.18,77.43 L54.99,17.14 L5.05,28.5 z"
            fill="#000000"
            opacity="0.15"
          />
          <path
            d="M54.99,17.14 L5.05,28.5 L54.99,0 L54.99,17.14 z"
            fill="#000000"
            opacity="0.05"
          />
          <path
            d="M54.99,17.14 L104.94,28.5 L54.99,0 L54.99,17.14 z"
            fill="#000000"
            opacity="0.1"
          />
          <path
            d="M20.18,77.43 L54.99,115 L5.34,86 L20.18,77.43 z"
            fill="#000000"
            opacity="0.35"
          />
          <path
            d="M20.18,77.43 L5.05,28.5 L5.34,86 L20.18,77.43 z"
            fill="#000000"
            opacity="0.25"
          />
          <path
            d="M89.8,77.43 L104.94,28.5 L104.64,86 L89.8,77.43 z"
            fill="#000000"
            opacity="0.25"
          />
          <path
            d="M89.8,77.43 L54.99,115 L104.64,86 L89.8,77.43 z"
            fill="#000000"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  );
};

export default D20Display;
