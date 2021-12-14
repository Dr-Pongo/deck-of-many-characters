import React, { useState } from 'react';
import './style.scss';
import map from 'lodash/map';

const DICE_MAP = new Map([
    ['d4', 4],
    ['d6', 6],
    ['d8', 8],
    ['d10', 10],
    ['d12', 12],
    ['d20', 20],
    ['d100', 100],
  ]);

  /* ==================================== *
   * TEMP handleDiceSelect                *
   * ==================================== */
  const handleDiceSelect = ({target}) => {
    this.setState({currentRoll: { ...this.state.currentRoll, 
      dice: { ...this.state.currentRoll.dice,
        [target.value]: { ...this.state.currentRoll.dice[target.value], 
          count: this.state.currentRoll.dice[target.value].count + 1 }
      }}});
  };

  /* ==================================== *
   * Handle Dice Roll!                    *
   * ==================================== */
  const handleDiceRoll = () => {
    // concern - dirty data? is updating prevRoll, updating the state value..? I think it is
    const prevRoll = this.state.currentRoll;

    // Map over every die to do calculation
    map(prevRoll.dice, (die, i) => {
      console.log(die);
      // Do the maths for each die, and add result to results array for that die
      for(let p = 0; p < die.count; p++){
        const tRes = Math.ceil(Math.random() * DICE_MAP.get(`${i}`))
        console.log(`Current result! ${tRes}`);
        die.result.push(tRes);
      }
      // keep running sum for total result
      prevRoll.result = die.result.reduce((prev, curr) => prev + curr, prevRoll.result);
    });
    
    // calculate total with modifiers
    prevRoll.result += prevRoll.modifiers;

    // Update the state! (reset currentRoll, add previous to history)
    //this.setState({ currentRoll: cleanRoll, history: [...this.state.history, prevRoll] })
  };

  // Empty state
  const cleanRoll = {
    dice: {
      d4: {count: 0, result: []},
      d6: {count: 0, result: []},
      d8: {count: 0, result: []}, 
      d10: {count: 0, result: []},
      d12: {count: 0, result: []},
      d20: {count: 0, result: []},
      d100: {count: 0, result: []},
    },
    modifiers: 0,
    result: 0,
  };

/* ==================================== *
 * Functional Component                 *
 * ==================================== */
const DiceRoller = () => {
    const [history, setHistory] = useState([]);
    const [currentRoll, setCurrentRoll] = useState(cleanRoll);

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
        </div>
    );
}

export default DiceRoller;