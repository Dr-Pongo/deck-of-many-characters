import React, { Component } from "react";
import { connect } from 'react-redux';
import "./styles.scss";
import map from 'lodash/map';
import { gotoPage, HOME_PAGE } from '../../containers/pageSlice';

const DICE_MAP = new Map([
  ['d4', 4],
  ['d6', 6],
  ['d8', 8],
  ['d10', 10],
  ['d12', 12],
  ['d20', 20],
  ['d100', 100],
]);

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


class GameplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoll: cleanRoll,
      history: [],
    };
  }

  /* ==================================== *
   * TEMP handleDiceSelect                *
   * ==================================== */
  handleDiceSelect = ({target}) => {
    this.setState({currentRoll: { ...this.state.currentRoll, 
      dice: { ...this.state.currentRoll.dice,
        [target.value]: { ...this.state.currentRoll.dice[target.value], 
          count: this.state.currentRoll.dice[target.value].count + 1 }
      }}});
  };

  /* ==================================== *
   * Handle Dice Roll!                    *
   * ==================================== */
  handleDiceRoll = () => {
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

    // TESTING
    console.log(`ROLL RESULT: ${prevRoll.result}`);

    // Update the state! (reset currentRoll, add previous to history)
    this.setState({ currentRoll: cleanRoll, history: [...this.state.history, prevRoll] })
  };

  render() {
    const {name, level, subClass, abilities, skills, actions} = this.props;
    return (
      <div className="page">
        <h2>GamePlay Page</h2>
        <div className="roll-space">
          <button type="button" onClick={this.handleDiceRoll} >ROLL THE CLIP</button>
          <div className="dice-box">
            <button type="button" value="d4"   onClick={this.handleDiceSelect} >d4</button>
            <button type="button" value="d6"   onClick={this.handleDiceSelect} >d6</button>
            <button type="button" value="d8"   onClick={this.handleDiceSelect} >d8</button>
            <button type="button" value="d10"  onClick={this.handleDiceSelect} >d10</button>
            <button type="button" value="d12"  onClick={this.handleDiceSelect} >d12</button>
            <button type="button" value="d20"  onClick={this.handleDiceSelect} >d20</button>
            <button type="button" value="d100" onClick={this.handleDiceSelect} >d100</button>
          </div>
        </div>
        {/** Leaving this out for now, so I can focus on Dice functionality
        <div className="basicInfo">
          <h3>{name}</h3>
          <label>{`Level ${level} ${subClass} ${this.props.class}`}</label>
          <div className="abilities" >
            { map(abilities, (ab, index) => {
                  return (<label key={`${ab.name}+${index}`}>{`${ab.name}: ${ab.val}`}</label>)
              })}
          </div>
        </div>
        <div className="additionalInfo"> 
          <div className="skills" >
            <h3>Skills: </h3>
            { map(skills, (skill, index) => {
                return (
                  <div className="skillEditor" key={`${skill.name}-${skill.ability}`}>
                      <label>{skill.name}</label>
                  </div>
                );
              }) }
          </div>
          <div className="saves" >
            <h3>Saving Throws: </h3>
            { map(abilities, (ab, index) => {
                  return (
                   <div className="save" key={ab.id} >
                     <h4>{ab.name}</h4>
                   </div> 
                  )
              }) }
          </div>
          <div className="actions" >
            <h3>Actions!</h3>
            { actions.map((action, index) => {
                return (
                  <div key={action.id} className="action" >
                    <label>{`${action.name}`}</label>
                    <button type="button">Attempt</button>
                    <button type="button">Result</button>
                  </div>
                );
             }) }
          </div>
        </div>
        <button onClick={() => this.props.updateCurrentPage(HOME_PAGE)} type="button">Return Home</button>
         */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { characters, selectedCharacter } = state;
  return characters[selectedCharacter];
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayPage);
