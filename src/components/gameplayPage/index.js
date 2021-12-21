import React, { Component } from "react";
import { connect } from 'react-redux';
import "./styles.scss";
import map from 'lodash/map';
import {v4 as uuidv4} from 'uuid';
import { gotoPage, HOME_PAGE } from '../../containers/pageSlice';
import DiceRoller from '../diceRollerComponent/index';
import { addAbilitySkillRoll } from '../../containers/diceTraySlice';
import { WIP_COMPONENT } from '../app/index';

class GameplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  /* ==================================== *
   * handleAbilityRoll                    *
   * ==================================== */
  handleAbilityRoll = (ability, save = false) => {
    const { proficiency } = this.props.currentCharacter;
    const diceToAdd = [{ name: 'd20', value: 20, key: uuidv4(), }];
    const modifierToAdd = this.calculateAbilityModifier(ability.val);
    this.props.addAbilitySkillRoll({roll: diceToAdd, mod: (save ? modifierToAdd + proficiency: modifierToAdd)});
  }

  /* ==================================== *
   * handleSkillRoll                      *
   * ==================================== */
  handleSkillRoll = (skill) => {
    const diceToAdd = [{ name: 'd20', value: 20, key: uuidv4(), }];
    const modifierToAdd = this.deriveSkillValue(skill);
    this.props.addAbilitySkillRoll({roll: diceToAdd, mod: modifierToAdd});
  }

  /* ==================================== *
   * Helpers                              *
   * ==================================== */
  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (iSkill) => {
    const { proficiency, abilities } = this.props.currentCharacter;
    const abilityValue = this.calculateAbilityModifier(abilities[iSkill.ability].val);
    console.log(`iSkill.ability: ${iSkill.ability}`);
    if(iSkill.prof) {
      return iSkill.exp ? (abilityValue + proficiency * 2) : (abilityValue + proficiency);
    }
    return abilityValue;
  };

  /* ==================================== *
   * Render Time                          *
   * ==================================== */
  render() {
    const {name, level, subClass, abilities, skills, actions} = this.props.currentCharacter;
    return (
      <div className="page">
        <h2>GamePlay Page</h2>
        <DiceRoller />
        <div className="basicInfo">
          <h3>{name}</h3>
          <label>{`Level ${level} ${subClass} ${this.props.class}`}</label>
          <div className="abilities" >
            { map(abilities, (ab, index) => {
                  return (<button type='button' 
                                  className='core-ability' 
                                  onClick={() => this.handleAbilityRoll(ab)}
                                  key={`${ab.name}+${index}`}>
                            {`${ab.name}: ${ab.val}`}
                          </button>
                  );
              })}
          </div>
        </div>
        <div className="additionalInfo"> 
          <div className="skills" >
            <h3>Skills: </h3>
            { map(skills, (skill, index) => {
                return (
                  <button type='button' 
                          className="skill-button" 
                          onClick={() => this.handleSkillRoll(skill)} 
                          key={`${skill.name}-${skill.ability}`}>
                    {skill.name}
                  </button>
                );
              }) }
          </div>
          <div className="saves" >
            <h3>Saving Throws: </h3>
            { map(abilities, (ab, index) => {
                  return (
                   <button type='button' 
                           className="save" key={ab.id} 
                           onClick={() => this.handleAbilityRoll(ab, ab.save)} >
                     {ab.name}
                   </button> 
                  )
              }) }
          </div>
          {WIP_COMPONENT && <div className="actions" >
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
          </div>}
        </div>
        <button onClick={() => this.props.updateCurrentPage(HOME_PAGE)} type="button">Return Home</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    currentCharacter: state.characters[state.selectedCharacter], 
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
    addAbilitySkillRoll: (roll) => dispatch(addAbilitySkillRoll(roll)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayPage);
