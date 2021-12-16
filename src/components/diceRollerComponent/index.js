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
            dice: [],
            modifier: modifiers,
            total: 0,
        };

        // Calculate dice roll
        result.dice = dice.map((die, i) => {
            const diceRoll = individualDiceRoll(die.value);
            result.total += diceRoll;
            return {...die, result: diceRoll};
        });

        // Add modifier
        result.total += modifiers;

        // Set history and empty out current dice pool
        setHistory(prev => [result, ...prev]);
        setModifiers(0);
        setDice([]);
    }

    /* ==================================== *
     * handleDiceSelect                     *
     * ==================================== */
    const handleDiceSelect = (die, dieValue) => {
        setDice(prev => ([...prev, 
            { name: die, value: dieValue, key: uuidv4(), }
        ]));
    };

    /* ==================================== *
     * handleDiceRemove                     *
     * ==================================== */
    const handleDiceRemove = (removeKey) => {
        console.log(`Current Dice: ${dice}\nSelected Key: ${removeKey}`);
        setDice(prev => prev.filter(cur => cur.key !== removeKey));
    };

    return (
        <div className="roll-space">
          <button type="button" onClick={handleDiceRoll} >ROLL ALL THE DICE!</button>
          <div className="dice-box">
            {map(DICE_MAP, (die, d) => {
                  return <button type="button" className={`dice-${d}`} key={uuidv4()} onClick={() => handleDiceSelect(d, die)} >{d}</button>
            })}
          </div>
          <div className='dice-tray'>
            {dice.map((die, d) =>
                <button type="button" className={`dice-${die.name}`} key={die.key} onClick={() => handleDiceRemove(die.key)} >{die.name}</button>
            )}
          </div>
          <div className='dice-history'>
            <label>Dice History (latest on top)</label>
            {history.map((roll, i) => {
                console.log(`${roll.dice}`);
                return (
                    <p key={uuidv4()} className='dice-result' >
                        {`Result: ${roll.dice.map(d => `(${d.name})${d.result}`).join(' + ')} + ${roll.modifier} = ${roll.total}`}
                    </p>
                );
            })}
          </div>
        </div>
    );
}

export default DiceRoller;