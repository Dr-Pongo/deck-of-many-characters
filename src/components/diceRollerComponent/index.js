import React, { useState } from 'react';
import './style.scss';
import {v4 as uuidv4} from 'uuid';
import map from 'lodash/map';
import D4Display from '../../features/d4/d4';
import D6Display from '../../features/d6/d6';

// Dice Map constant
// this helps with maths and keeping track of rolls
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
 * Dice Roller Functional Component     *
 * ==================================== */
const DiceRoller = () => {
    const [history, setHistory] = useState([]);
    const [dice, setDice] = useState([]);
    const [modifiers, setModifiers] = useState(0);
    const [advantage, setAdvantage] = useState(false);
    const [disadvantage, setDisAdvantage] = useState(false);
 
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

    /* ==================================== *
     * Render Time!                         *
     * ==================================== */
    return (
        <div className="roll-space">
          <button type="button" onClick={handleDiceRoll} >ROLL ALL THE DICE!</button>
          <div className="dice-box">
            {map(DICE_MAP, (die, d) => {
                switch(die){
                    case 4: 
                        return <D4Display dieValue={die} key={die.key} onClick={() => handleDiceSelect(d, die)} />
                    case 6: 
                        return <D6Display dieValue={die} key={die.key} onClick={() => handleDiceSelect(d, die)} />
                    default:
                        return <button type="button" className={`dice-${d}`} key={uuidv4()} onClick={() => handleDiceSelect(d, die)} >{d}</button>

                }
            })}
          </div>
          <div className='dice-tray'>
            {dice.map((die, d) => {
                switch(die.value){
                    case 4: 
                        return <D4Display dieValue={die.value} key={die.key} onClick={() => handleDiceSelect(d, die)} />
                    case 6: 
                        return <D6Display dieValue={die.value} key={die.key} onClick={() => handleDiceSelect(d, die)} />
                    default:
                        return <button type="button" className={`dice-${die.name}`} key={die.key} onClick={() => handleDiceRemove(die.key)} >{die.name}</button>
                }
            })}
          </div>
          <div className='dice-history'>
            <label>Dice History (latest on top)</label>
            {history.map((roll, i) => {
                console.log(`${roll.dice}`);
                return (
                    <div key={uuidv4()} className='dice-result' >
                        {roll.dice.map(die => {
                            return (
                                <div className='dice-result-combo'>
                                    {(die.value !== 4 && die.value !== 6) && <button type='button' className={`${dice-die.name}`} key={die.key}>{die.result}</button>}
                                    {die.value === 4 && <D4Display dieValue={die.result} key={die.key} />}
                                    {die.value === 6 && <D6Display dieValue={die.result} key={die.key} />}
                                    <p> + </p>
                                </div>
                            );
                        })}
                        <p>{`${roll.modifier} = ${roll.total}`}</p>
                    </div>
                );
            })}
          </div>
        </div>
    );
}

export default DiceRoller;