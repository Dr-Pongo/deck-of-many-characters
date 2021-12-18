import React, { useState } from 'react';
import './style.scss';
import {v4 as uuidv4} from 'uuid';
import map from 'lodash/map';
import D4Display from '../../features/dice/d4';
import D6Display from '../../features/dice/d6';
import D8Display from '../../features/dice/d8';
import D10Display from '../../features/dice/d10';
import D12Display from '../../features/dice/d12';
import D20Display from '../../features/dice/d20';
import D100Display from '../../features/dice/d100';

// Dice Map constant
// this helps with maths and keeping track of rolls
// also this helps clean up rendering all of the dice
const DICE_MAP = {
    d4: {value: 4, D4Display: D4Display},
    d6: {value: 6, D6Display: D6Display},
    d8: {value: 8, D8Display: D8Display},
    d10: {value: 10, D10Display: D10Display},
    d12: {value: 12, D12Display: D12Display},
    d20: {value: 20, D20Display: D20Display},
    d100: {value: 100, D100Display: D100Display},
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
            let diceRoll;
            // if(advantage) {
            //     /* ==================================================================================== *
            //      * So the main idea with advantage/disadvantage is:                                     *
            //      * the unused number (the lower for advantage, and higher for disadvantage)             *
            //      * will be negative and not used in the calculation for the total.                      *
            //      * This way when we display the results, we can show both rolls to allow people to be   *
            //      * equally upset for either. The negative number will display greyed out or something   *
            //      * ==================================================================================== */
                

            //     let rollA = individualDiceRoll(die.value);
            //     let rollB = individualDiceRoll(die.value);
            //     if(rollA > rollB) {
            //         rollB *= -1;
            //         result.total += rollA;
            //     } else {
            //         rollA *= -1;
            //         result.total += rollB;
            //     }
            //     diceRoll = [rollA, rollB];




            // } else {
                diceRoll = individualDiceRoll(die.value);
                result.total += diceRoll;
            // }
            
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
        setDice(prev => prev.filter(cur => cur.key !== removeKey));
    };

    /* ==================================== *
     * handleAdvantageSelect                *
     * ==================================== */
    const handleAdvantageSelect = () => {
        setAdvantage(prev => !prev);
    };

    /* ==================================== *
     * Render Time!                         *
     * ==================================== */
    return (
        <div className="roll-space">
          <button type="button" onClick={handleDiceRoll} >ROLL THE DICE!</button>
          <button type="button" onClick={handleAdvantageSelect} >Advantage</button>
          <div className="dice-box">
            {map(DICE_MAP, (die, d) => {
                // All of the Displays have similar names, this be a neat way to do things
                const TagName = die[`D${die.value}Display`];
                return <TagName dieValue={die.value} key={die.key} onClick={() => handleDiceSelect(d, die.value)} />
            })}
          </div>
          <div className='dice-tray'>
            {dice.map((die, d) => {
                const TagName = DICE_MAP[die.name][`D${die.value}Display`];
                return <TagName dieValue={die.value} key={die.key} onClick={() => handleDiceRemove(die.key)} />
            })}
          </div>
          <div className='dice-history'>
            <label>Dice History (latest on top)</label>
            {history.map((roll, i) => {
                return (
                    <div key={uuidv4()} className='dice-result' >
                        {roll.dice.map(die => {
                            const TagName = DICE_MAP[die.name][`D${die.value}Display`];
                            return (
                                <div key={uuidv4()} className='dice-result-combo'>
                                    <TagName dieValue={die.result} key={die.key} />
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