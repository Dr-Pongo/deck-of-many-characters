import React, { useState } from "react";
import "./style.scss";

/* ==================================== *
 * Dice Roller Functional Component     *
 * ==================================== */
const StatRoller = (props) => {
  const lookup = {
    1: {
      key: "3d6",
      average: 11.5,
      min: 3,
      max: 18,
      numberToBeat: 69,
    },
    2: {
      key: "4d6 drop lowest",
      average: 12.25,
      min: 3,
      max: 18,
      numberToBeat: 74,
    },
    3: {
      key: "2d6+6",
      average: 13,
      min: 8,
      max: 18,
      numberToBeat: 78,
    },
    4: {
      key: "5d4",
      average: 12.5,
      min: 5,
      max: 20,
      numberToBeat: 75,
    },
    5: {
      key: "1d12+6",
      average: 13.5,
      min: 7,
      max: 18,
      numberToBeat: 81,
    },
    6: {
      key: "1+1d4+1d6+1d8",
      average: 11.5,
      min: 4,
      max: 19,
      numberToBeat: 69,
    },
    7: {
      key: "1d20",
      average: 10.5,
      min: 1,
      max: 20,
      numberToBeat: 63,
    },
  };
  const roll3d6 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const result =
        Math.floor(Math.random() * 6) +
        Math.floor(Math.random() * 6) +
        Math.floor(Math.random() * 6) +
        3;
      resultArray.push(result);
    }
    return resultArray;
  };
  const roll4d6dropLowest = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const tempArray = [];
      tempArray.push(Math.floor(Math.random() * 6) + 1);
      tempArray.push(Math.floor(Math.random() * 6) + 1);
      tempArray.push(Math.floor(Math.random() * 6) + 1);
      tempArray.push(Math.floor(Math.random() * 6) + 1);
      const index = tempArray.indexOf(Math.min(...tempArray));
      tempArray.splice(index, 1);
      resultArray.push(
        tempArray.reduce((accumulator, current) => {
          return accumulator + current;
        })
      );
    }
    return resultArray;
  };
  const roll2d6plus6 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const result =
        Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6) + 8;
      resultArray.push(result);
    }
    return resultArray;
  };
  const roll5d4 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const result =
        Math.floor(Math.random() * 4) +
        Math.floor(Math.random() * 4) +
        Math.floor(Math.random() * 4) +
        Math.floor(Math.random() * 4) +
        Math.floor(Math.random() * 4) +
        5;
      resultArray.push(result);
    }
    return resultArray;
  };

  const roll1d12plus6 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const result = 7 + Math.floor(Math.random() * 12);
      resultArray.push(result);
    }
    return resultArray;
  };

  const roll1plus1d41d61d8 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      const result =
        Math.floor(Math.random() * 4) +
        Math.floor(Math.random() * 6) +
        Math.floor(Math.random() * 8) +
        4;
      resultArray.push(result);
    }
    return resultArray;
  };
  const roll1d20 = () => {
    const resultArray = [];
    for (let i = 0; i < 6; i++) {
      resultArray.push(Math.floor(Math.random() * 20) + 1);
    }
    return resultArray;
  };

  // Local State
  const [array, updateArray] = useState([]);
  const [showStatGenerator, toggleShowStatGenerator] = useState(false);
  const [arrayGeneratorType, updateGeneratorType] = useState(0);

  const generateArray = () => {
    //Standard Array
    if (arrayGeneratorType === 0) {
      updateArray([15, 14, 13, 12, 10, 8]);
      return;
    }
    //3d6
    if (arrayGeneratorType === 1) {
      updateArray(roll3d6());
      return;
    }
    //4d6 drop lowest
    if (arrayGeneratorType === 2) {
      updateArray(roll4d6dropLowest());
      return;
    }
    //2d6+6
    if (arrayGeneratorType === 3) {
      updateArray(roll2d6plus6());
      return;
    }
    //5d4
    if (arrayGeneratorType === 4) {
      updateArray(roll5d4());
      return;
    }
    if (arrayGeneratorType === 5) {
      updateArray(roll1d12plus6());
      return;
    }
    if (arrayGeneratorType === 6) {
      updateArray(roll1plus1d41d61d8());
      return;
    }
    if (arrayGeneratorType === 7) {
      updateArray(roll1d20());
      return;
    }
  };

  /* ==================================== *
   * Render Time!                         *
   * ==================================== */
  return (
    <div className="stat-array-generator">
      <button
        type="button"
        onClick={() => toggleShowStatGenerator(!showStatGenerator)}
        className="big-toggle-button"
      >
        {!showStatGenerator
          ? array.length > 0
            ? array.join(", ")
            : "I NEED A STAT ARRAY STAT"
          : "HIDE THIS SHIT"}
      </button>
      {showStatGenerator && (
        <div className="column">
          <h4>Please choose an dice roll for your stat generation</h4>
          <div className="detail-row">
            <select
              value={arrayGeneratorType}
              onChange={(event) => {
                updateGeneratorType(parseInt(event.target.value));
                updateArray([]);
              }}
            >
              <option value="0" key="Standard Array">
                Standard Array
              </option>
              <option value="1" key="3d6">
                3d6
              </option>
              <option value="2" key="4d6 drop lowest">
                4d6 Drop Lowest
              </option>
              <option value="3" key="2d6+6">
                2d6+6
              </option>
              <option value="4" key="5d4">
                5d4
              </option>
              <option value="5" key="1d12+6">
                1d12+6
              </option>
              <option value="6" key="1+1d4+1d6+1d8">
                1+1d4+1d6+1d8
              </option>
              <option value="7" key="1d20">
                1d20
              </option>
            </select>
          </div>
          <div className="detail-row">
            <div className="detail">{`Min: ${
              lookup[arrayGeneratorType]?.min || "N/A"
            }`}</div>
            <div className="detail">{`Average: ${
              lookup[arrayGeneratorType]?.average || "N/A"
            }`}</div>
            <div className="detail">{`Max: ${
              lookup[arrayGeneratorType]?.max || "N/A"
            }`}</div>
            <div className="detail">{`Average Composite: ${
              lookup[arrayGeneratorType]?.numberToBeat || "N/A"
            }`}</div>
          </div>

          {!(arrayGeneratorType === 0 && array.length !== 0) && (
            <button
              type="button"
              onClick={() => generateArray()}
              className="big-toggle-button"
            >
              {array.length > 0 ? "ROLL IT AGAIN" : "ROLL IT"}
            </button>
          )}
          <div className="stat-row">
            {array.map((stat, index) => {
              return (
                <span className="stat" key={`${stat}-${index}`}>
                  {stat}
                  {index < array.length - 1 ? "," : ""}
                </span>
              );
            })}
          </div>

          <div>
            {`Stat Composite Score: ${
              array.length > 0
                ? array.reduce((accumulator, current) => accumulator + current)
                : "N/A"
            }`}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatRoller;
