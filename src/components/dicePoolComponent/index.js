import React, { useState } from "react";
import "./style.scss";
import { v4 as uuidv4 } from "uuid";
import map from "lodash/map";
import D4Display from "../../features/dice/D4Display";
import D6Display from "../../features/dice/D6Display";
import D8Display from "../../features/dice/D8Display";
import D10Display from "../../features/dice/D10Display";
import D12Display from "../../features/dice/D12Display";
import D20Display from "../../features/dice/D20Display";
import D100Display from "../../features/dice/D100Display";

// Dice Map constant
// this helps with maths and keeping track of rolls
// also this helps clean up rendering all of the dice
const DICE_MAP = {
  d4: { value: 4, D4Display: D4Display },
  d6: { value: 6, D6Display: D6Display },
  d8: { value: 8, D8Display: D8Display },
  d10: { value: 10, D10Display: D10Display },
  d12: { value: 12, D12Display: D12Display },
  d20: { value: 20, D20Display: D20Display },
  d100: { value: 100, D100Display: D100Display },
};

/* ==================================== *
 * Dice Roller Functional Component     *
 * ==================================== */
const DicePool = (props) => {
  const { addDice, removeDice, currentDice } = props;

  /* ==================================== *
   * handleDiceSelect                     *
   * ==================================== */
  const handleDiceSelect = (die, dieValue) => {
    addDice({ name: die, value: dieValue, key: uuidv4() });
  };

  /* ==================================== *
   * handleDiceRemove                     *
   * ==================================== */
  const handleDiceRemove = (removeKey) => {
    removeDice(removeKey);
  };

  /* ==================================== *
   * getDieCount                          *
   * ==================================== */
  const getDieCount = (dieValue) => {
    return currentDice.reduce((prev, cur) => {
      return cur.value === dieValue ? 
        prev++ :
        prev;
    }, 0);
  };

  /* ==================================== *
   * Render Time!                         *
   * ==================================== */
  return (
    <div className="dice-pool">
      <div className="dice-pool-box">
        {map(DICE_MAP, (die, d) => {
          // All of the Displays have similar names, this be a neat way to do things
          const TagName = die[`D${die.value}Display`];
          return (
            <div className='dice-pool-tray' >
              <TagName
                dieValue={die.value}
                key={die.key}
                onClick={() => handleDiceSelect(d, die.value)}
                isRollResult={false}
              />
              <div>
                <button 
                  type='button' 
                  className='add-die'
                  onClick={() => handleDiceSelect(d, die.value)}
                >
                  +
                </button>
                <p>{`x${getDieCount(die.value)}`}</p>
                <button
                  type='button' 
                  className='remove-die'
                  onClick={() => handleDiceRemove(die.key)}
                >
                  -
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="pool-clear"
        // onClick={() => setDice([])}
      >
        Clear Selection
      </button>
    </div>
  );
};

export default DicePool;
