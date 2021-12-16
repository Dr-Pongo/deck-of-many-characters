import React, { useState } from 'react';
import './style.scss';
import {v4 as uuidv4} from 'uuid';
import map from 'lodash/map';

const DICE_MAP = {
    d4: 4,
    d6: 6,
    d8: 8,
    d10: 10,
    d12: 12,
    d20: 20,
    d100: 100
};

/* ==================================== *
 * Functional Component                 *
 * ==================================== */
const DiceRoller = () => {
    const [history, setHistory] = useState([]);
    const [dice, setDice] = useState([]);
    const [modifiers, setModifiers] = useState(0);
 
    /* ==================================== *
     * Handle Dice Roll!                    *
     * ==================================== */
    // Handle individual dice rolls based on the DICE_MAP die value
    const individualDiceRoll = (dieVal) => {
        return Math.ceil(Math.random() * dieVal);
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

        // Set history and empty out current dice pool
    }

    /* ==================================== *
     * handleDiceSelect                     *
     * ==================================== */
    const handleDiceSelect = (die, dieValue) => {
        setDice(prev => ([...prev, 
            { die: die, value: dieValue }
        ]));
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
          {map(DICE_MAP, (die, d) => {
                return <button className={`dice-${d}`} type="button" onClick={() => handleDiceSelect(d, die)} >{d}</button>
            })}
          </div>
          <div className='dice-tray'>
            {/* {
            } */}
          </div>
          {history.map((roll, i) => {
              return (<p key={uuidv4()} >{`Result: ${roll.total}`}</p>);
          })}
        </div>
    );
}

export default DiceRoller;