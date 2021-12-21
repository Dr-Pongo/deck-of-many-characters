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
import { selectDiceTray, addDie, removeDie, updateModifier, clearDiceTray } from '../../containers/diceTraySlice';
import { useDispatch, useSelector } from 'react-redux';

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
const DiceRoller = (props) => {
    // Local State
    const [history, setHistory] = useState([]);
    const [advantage, setAdvantage] = useState(false);
    const [disadvantage, setDisAdvantage] = useState(false);
    // store fun
    const dispatch = useDispatch();
    const {dice, modifier} = useSelector(selectDiceTray);
 
    /* ==================================== *
     * Handle Dice Roll!                    *
     * ==================================== */
    // Handle individual dice rolls based on the DICE_MAP die value
    const individualDiceRoll = (dieVal) => {
        return Math.ceil(Math.random() * dieVal);
    };
    
    const handleDiceRoll = () => {
        if(dice.length < 1) return;
        // new result object that will populate history with necessary information
        const result = {
            dice: [],
            modifier: modifier,
            total: 0,
        };

        // Calculate dice roll
        /* ==================================================================================== *
         * So the main idea with advantage/disadvantage is:                                     *
         * the unused number (the lower for advantage, and higher for disadvantage)             *
         * will be negative and not used in the calculation for the total.                      *
         * This way when we display the results, we can show both rolls to allow people to be   *
         * equally upset for either. The negative die will display greyed out or something      *
         * ==================================================================================== */
        result.dice = dice.map((die, i) => {
            let diceRoll = [];

            if(!advantage && !disadvantage) {
                diceRoll.push(individualDiceRoll(die.value));
            } else {
                const rollA = individualDiceRoll(die.value);
                const rollB = individualDiceRoll(die.value);
                if(advantage) {
                    diceRoll = rollA > rollB ? [rollA, rollB * -1] : [rollB, rollA * -1];
                }
                if(disadvantage) {
                    diceRoll = rollA < rollB ? [rollA, rollB * -1] : [rollB, rollA * -1];
                }
            }
            
            result.total += diceRoll[0];
            return {...die, result: diceRoll};
        });
        // Add modifier
        result.total += result.modifier;

        // Cleanup Time
        setHistory(prev => [result, ...prev]);
        setDisAdvantage(false);
        setAdvantage(false);

        // this handles cleaning up mods and dice
        dispatch(clearDiceTray());
    }

    /* ==================================== *
     * handleDiceSelect                     *
     * ==================================== */
    const handleDiceSelect = (die, dieValue) => {
        dispatch(addDie({ name: die, value: dieValue, key: uuidv4(), }));
    };

    /* ==================================== *
     * handleDiceRemove                     *
     * ==================================== */
    const handleDiceRemove = (removeKey) => {
        dispatch(removeDie(removeKey));
    };

    /* ==================================== *
     * handleAdvantageSelect                *
     * ==================================== */
    const handleAdvantageSelect = () => {
        if(disadvantage){
            setDisAdvantage(prev => !prev);
        }
        setAdvantage(prev => !prev);
    };

    /* ==================================== *
     * handleDisadvantageSelect             *
     * ==================================== */
    const handleDisadvantageSelect = () => {
        if(advantage){
            setAdvantage(prev => !prev);
        }
        setDisAdvantage(prev => !prev);
    };

    /* ==================================== *
     * handleManualMod                      *
     * ==================================== */
    const handleManualMod = ({target}) => {
        dispatch(updateModifier(parseInt(target.value)));;
    };

    /* ==================================== *
     * Render Time!                         *
     * ==================================== */
    return (
        <div className="roll-space">
          <button type="button" onClick={handleDiceRoll} >ROLL THE DICE!</button>
          <button type="button" className={advantage ? 'clicked' : ''} onClick={handleAdvantageSelect} >Advantage</button>
          <button type="button" className={disadvantage ? 'clicked' : ''} onClick={handleDisadvantageSelect} >Disdvantage</button>
          <div className="dice-box">
            {map(DICE_MAP, (die, d) => {
                // All of the Displays have similar names, this be a neat way to do things
                const TagName = die[`D${die.value}Display`];
                return <TagName dieValue={die.value} key={die.key} onClick={() => handleDiceSelect(d, die.value)} />
            })}
            <input type='number' onChange={handleManualMod} value={modifier} />
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
                                    {die.result.length === 1 ? 
                                        <TagName dieValue={die.result} key={die.key} /> : 
                                        <div className="dice-result-vantage" >
                                            <TagName dieValue={(die.result[0])} />
                                            <TagName dieValue={(die.result[1])} />
                                        </div>
                                        }
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