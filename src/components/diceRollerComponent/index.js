import React, { useState } from 'react';
import './style.scss';
import {v4 as uuidv4} from 'uuid';

const DICE_MAP = new Map([
    ['d4', 4],
    ['d6', 6],
    ['d8', 8],
    ['d10', 10],
    ['d12', 12],
    ['d20', 20],
    ['d100', 100],
  ]);

  const newDice = {
    d4: 0,
    d6: 0,
    d8: 0, 
    d10: 0,
    d12: 0,
    d20: 0,
    d100: 0,
  };

/* ==================================== *
 * Functional Component                 *
 * ==================================== */
const DiceRoller = () => {
    const [history, setHistory] = useState([]);
    const [dice, setDice] = useState(newDice);
    const [modifiers, setModifiers] = useState(0);
 
    /* ==================================== *
     * Handle Dice Roll!                    *
     * ==================================== */
    // Handle individual dice rolls based on the DICE_MAP die value
    const individualDiceRoll = (die) => {
        return Math.ceil(Math.random() * DICE_MAP.get(die));
    };

    const handleDiceRoll = () => {
        // new result object that will populate history with necessary information
        const result = {
            d4: [],
            d6: [],
            d8: [], 
            d10: [],
            d12: [],
            d20: [],
            d100: [],
            modifier: modifiers,
            total: 0,
        };

        // Calculate individual results
        DICE_MAP.forEach((value, key) => {
            for(let p = 0; p < dice[key]; p++) {
                const diceRoll = individualDiceRoll(key);
                // update total
                result.total += diceRoll;
                // add individual results
                result[key].push(diceRoll);
            }
        });
        result.total += result.modifier;

        // Set history and empty out current dice pool
        setHistory(prev => [...prev, result]);
        setDice(newDice);
        setModifiers(0);
    }

    /* ==================================== *
     * handleDiceSelect                     *
     * ==================================== */
    const handleDiceSelect = ({target}) => {
        setDice(prev => ({...prev, 
            [target.value]: prev[target.value] + 1
        }));
    };

    /* ==================================== *
     * handleDiceRemove                     *
     * ==================================== */
    const handleDiceRemove = ({target}) => {
        setDice(prev => ({...prev, 
            [target.value]: prev[target.value] - 1
        }));
    };

    return (
        <div className="roll-space">
          <button type="button" onClick={handleDiceRoll} >ROLL THE CLIP</button>
          <div className="dice-box">
            <button type="button" value="d4"   onClick={handleDiceSelect} >d4</button>
            <button type="button" value="d6"   onClick={handleDiceSelect} >d6</button>
            <button type="button" value="d8"   onClick={handleDiceSelect} >d8</button>
            <button type="button" value="d10"  onClick={handleDiceSelect} >d10</button>
            <button type="button" value="d12"  onClick={handleDiceSelect} >d12</button>
            <button type="button" value="d20"  onClick={handleDiceSelect} >d20</button>
            <button type="button" value="d100" onClick={handleDiceSelect} >d100</button>
          </div>
          <div className='dice-tray'>
            {
                // Calculate individual results
                DICE_MAP.forEach((value, key) => {
                    for(let p = 0; p < dice[key]; p++) {
                        <button type="button" value={key} onClick={handleDiceRemove} >{key}</button>
                    }
                })
            }
          </div>
          {history.map((roll, i) => {
              return (<p key={uuidv4()} >{`Result: ${roll.total}`}</p>);
          })}
        </div>
    );
}

export default DiceRoller;