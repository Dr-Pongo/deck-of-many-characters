import React, { Component } from "react";
import { connect } from 'react-redux';
import "./styles.scss";
import AbilityEditor from './abilityEditor/index';
import map from 'lodash/map';
// UUID DOCS: npmjs.com/package/uuid
import {v4 as uuidv4} from 'uuid';
import { gotoPage, HOME_PAGE } from '../../containers/pageSlice';
import { addNewCharacter } from '../../containers/charactersSlice';
import { WIP_COMPONENT } from '../app/index';

//GLOBALS
const SHOULD_BE_NUMBER = true;

class CharacterCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      name: '',
      level: 1,
      class: '',
      subClass: '',
      proficiency: 2,
      abilities: {
        strength: {name: "Strength", val: 10, save: false, id:uuidv4()},
        dexterity: {name: "Dexterity", val: 10, save: false, id:uuidv4()},
        constitution: {name: "Constitution", val: 10, save: false, id:uuidv4()},
        intelligence: {name: "Intelligence", val: 10, save: false, id:uuidv4()},
        wisdom: {name: "Wisdom", val: 10, save: false, id:uuidv4()},
        charisma: {name: "Charisma", val: 10, save: false, id:uuidv4()},
      },
      skills: {
        /* Strength */
        athletics: {name: 'Athletics', ability: "strength", prof: false, exp: false},
        /* Dexterity */
        acrobatics: {name: "Acrobatics", ability: "dexterity", prof: false, exp: false},
        sleightOfHand: {name: "Sleight of Hand", ability: "dexterity", prof: false, exp: false},
        stealth: {name: "Stealth", ability: "dexterity", prof: false, exp: false},
        /* Intelligence */
        arcana: {name: "Arcana", ability: "intelligence", prof: false, exp: false},
        history: {name: "History", ability: "intelligence", prof: false, exp: false},
        investigation: {name: "Investigation", ability: "intelligence", prof: false, exp: false},
        nature: {name: "Nature", ability: "intelligence", prof: false, exp: false},
        religion: {name: "Religion", ability: "intelligence", prof: false, exp: false},
        /* Wisdom */
        animalHandling: {name: "Animal Handling", ability: "wisdom", prof: false, exp: false},
        insight: {name: "Insight", ability: "wisdom", prof: false, exp: false},
        medicine: {name: "Medicine", ability: "wisdom", prof: false, exp: false},
        perception: {name: "Perception", ability: "wisdom", prof: false, exp: false},
        survival: {name: "Survival", ability: "wisdom", prof: false, exp: false},
        /* Charisma */
        deception: {name: "Deception", ability: "charisma", prof: false, exp: false},
        intimidation: {name: "Intimidation", ability: "charisma", prof: false, exp: false},
        performance: {name: "Performance", ability: "charisma", prof: false, exp: false},
        persuasion: {name: "Persuasion", ability: "charisma", prof: false, exp: false},
      },
      actions: [],
    };
  };

  /* ==================================== *
   * Lifecycle Method(s)                  *
   * ==================================== */
  componentDidUpdate(prevProps, prevState) {
    if(prevState.level !== this.state.level) {
      this.calculateProficiency();
    }
  };
  
  /* ==================================== *
   * Baisic Character Method(s)           *
   * ==================================== */
  updateBasicInfoValue = (key, shouldBeNumber = false) => (event) => {
    if(!shouldBeNumber){
      this.setState({ [key]: event.target.value, });
      return;
    }
    this.setState({ [key]: parseInt(event.target.value) });
  };

  calculateProficiency = () => {
    const curLevel = this.state.level;
    switch(true){
      case (curLevel < 5):
        this.setState({proficiency: 2});
        break;
      case (curLevel < 9):
        this.setState({proficiency: 3});
        break;
      case (curLevel < 13):
        this.setState({proficiency: 4});
        break;
      case (curLevel < 17):
        this.setState({proficiency: 5});
        break;
      default: 
        this.setState({proficiency: 6});
    }
  };
  
  /* ==================================== *
   * Ability Method(s)                    *
   * ==================================== */
  updateAbility = (key) => (event) => {
    console.log(`${key}`);
    this.setState({ 
      abilities: {...this.state.abilities, 
        [key]:{...this.state.abilities[key], 
          val:parseInt(event.target.value)}}
    })
  };

  handleAbilitySave = (key) => ({target}) => {
    console.log(`${key}, ${target.value}`);
    this.setState({ 
      abilities: {...this.state.abilities, 
        [key]:{...this.state.abilities[key], 
          save: target.value === 'true'}}
    })
  };

  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (prof, exp, ability) => {
    const abilityValue = this.calculateAbilityModifier(this.state.abilities[ability].val);
    if(prof) {
      return exp ? (abilityValue + this.state.proficiency * 2) : (abilityValue + this.state.proficiency);
    }
    return abilityValue;
  };

  /* ==================================== *
   * Skill Method(s)                      *
   * ==================================== */
  handleProfSkillButtonClick = (key) => {
    // Can't have expertise without proficiency!
    if(this.state.skills[key].prof && this.state.skills[key].exp){
      this.setState({ 
        skills: { ...this.state.skills, 
          [key]: {...this.state.skills[key],
            prof: !this.state.skills[key].prof,
            exp: false
          }
        }
      })
      return;
    }
    this.setState({ 
      skills: { ...this.state.skills, 
        [key]: {...this.state.skills[key],
          prof: !this.state.skills[key].prof
        }
      }
    })
  };

  handleExpSkillButtonClick = (key) => {
    this.setState({ 
      skills: { ...this.state.skills, 
        [key]: {...this.state.skills[key],
          exp: !this.state.skills[key].exp
        }
      }
    })
  };
  
  /* ==================================== *
   * Action Method(s)                     *
   * ==================================== */
  handleActionAddRemove = (removeID = 0) => () => {
    // Empty Action object
    const initialAction = {
      // must Haves
      id: uuidv4(),
      name: '', 
      proficiency: false,
      // attempt
      attemptActive: false,
      attemptAbility: '',
      attemptBonus: 0,
      // result
      resultActive: false,
      resultAbility: '',
      resultBonus: 0,
      resultDice: '',
    };

    // If a remove ID is recieved, removed selected ID from the current actions list
    // Otherwise add a new initialAction from above
    const actions = removeID ? 
      this.state.actions.filter((action) => action.id !== removeID) :
      [...this.state.actions, initialAction];

    this.setState({
      actions
    });
  };
  
  handleActionChange = (actionID, actionKeyValue) => ({target}) => {
    // We need some type checks here so we don't get 'true' instead of a good true...
    let newValue;
    switch(actionKeyValue){
      case 'proficiency':
      case 'attemptActive':
      case 'resultActive':
        newValue = target.value === 'true';
        break;
      case 'attemptBonus':
      case 'resultBonus':
        newValue = parseInt(target.value);
        break;
      default:
        newValue = target.value;
    }
    
    const actions = this.state?.actions.map(action => {
      return action.id === actionID ? {...action, [actionKeyValue]: newValue} : action;
    });

    this.setState({
      actions
    });
  };

  /* ==================================== *
   * Form Finishers                       *
   * ==================================== */
  handleSubmit = () => {
    // Validate ALL the data
    /**
     * Probably need to have smaller handlers that feed this validation, 
     *  it'll be a little cleaner..
     */
    // Add new character to store
    this.props.addCharacter(this.state);
    // return to the Home Page
    this.props.updateCurrentPage(HOME_PAGE);
  }
  handleCancel = () => {
    // nuke changes and return to the Home Page
    this.props.updateCurrentPage(HOME_PAGE);
  }

  /* ==================================== *
   * Render Time!                         *
   * ==================================== */
  render() {
    const {abilities, skills, level} = this.state;
    return (
    <div className="char-create-page" >
      <h2>Character Creation</h2>
      <form className="char-create-form" >
        <div className="core-info">
          <label>Character Name: 
            <input type="text" 
              onChange={this.updateBasicInfoValue('name')} />
          </label>
          <label>Level: 
            <input type="number" 
              max="20" min="1" 
              value={level} 
              onChange={this.updateBasicInfoValue('level', SHOULD_BE_NUMBER)} />
          </label>
          <label>Class: 
            <input type="text" 
              onChange={this.updateBasicInfoValue('class')} />
          </label>
          <label>SubClass: 
            <input type="text" onChange={this.updateBasicInfoValue('subClass')} />
          </label>
        </div>
        <div className="additional-information"> 
          <div className="abilities column-info-display" >
            { map(abilities, (ab, index) => {
                  return (
                    <AbilityEditor
                      key={ab.id}
                      ability={ab}
                      handleChange={this.updateAbility(index)} />
                  )
              }) }
          </div>
          <div className='skills column-info-display' >
            <h3>Skills</h3>
            { map(skills, (skill, index) => {
                return (
                  <div className="skill-editor" key={`${skill.name}-${skill.ability}`}>
                      <h4>{skill.name}: </h4>
                      <p>{this.deriveSkillValue(skill.prof, skill.exp, skill.ability)}</p>
                      <button className={skill.prof ? 'clicked' : ''} type="button" onClick={() => this.handleProfSkillButtonClick(index, 'prof')}>Proficiency</button>
                      {skill.prof && <button className={skill.exp ? 'clicked' : ''} type="button" onClick={() => this.handleExpSkillButtonClick(index, 'exp')}>Expertise</button>}
                  </div>
                );
              }) }
          </div>
          <div className='saves column-info-display' >
            <h3>Saving Throws: </h3>
            { map(abilities, (ab, index) => {
                  return (
                   <div className="save" key={ab.id} >
                     <h4>{ab.name}</h4>
                     {/* Printing out Ability Modifier, adding proficiency if ability save is true */}
                     <p>{`${ab.save ? this.calculateAbilityModifier(ab.val) + this.state.proficiency : this.calculateAbilityModifier(ab.val)}`}</p>
                    <button className={ab.save ? 'clicked' : ''} type="button" value={!ab.save} onClick={this.handleAbilitySave(index)}>Proficiency</button>
                   </div> 
                  )
              }) }
          </div>
          {WIP_COMPONENT && <div className="actions" >
            <h3>Actions!</h3>
            <button type="button" onClick={this.handleActionAddRemove()} >Add Action!</button>
            { 
              this.state.actions.map((action, index) => {
                return (
                  <div key={action.id} className="action" >
                    <h4>Action #{index}</h4>
                    <div className="action-info">
                      <label>Action Name: </label>
                      <input type="text" value={action.name} onChange={this.handleActionChange(action.id, 'name')} />
                      <button type="button" className={action.proficiency ? 'clicked' : ''} value={!action.proficiency} onClick={this.handleActionChange(action.id, 'proficiency')} >Proficiency</button>
                    </div>
                    {!action.attemptActive && <button type="button" value={!action.attemptActive} onClick={this.handleActionChange(action.id, 'attemptActive')}>Attempt Modifier</button>}
                    {action.attemptActive && 
                      <div className="actionInfo" >
                        <label>Attempt Ability:</label>
                        <select value={action.attemptAbility} onChange={this.handleActionChange(action.id, 'attemptAbility')} >
                          <option value="none" >None</option>
                          {
                            map(abilities, (ab, index) => {
                              return (
                                <option key={uuidv4()} value={abilities[ab]} >{ab.name}</option>
                              )
                            })
                          }
                        </select>
                        <label>Attempt Bonus:</label>
                        <input type="number" value={action.attemptBonus} onChange={this.handleActionChange(action.id, 'attemptBonus')} />
                        <button type="button" value={!action.attemptActive} onClick={this.handleActionChange(action.id, 'attemptActive')}>Remove Modifier</button>
                      </div>
                    } 
                    {!action.resultActive && <button type="button" value={!action.resultActive} onClick={this.handleActionChange(action.id, 'resultActive')}>Result Modifier</button>}
                    {action.resultActive && 
                      <div className="actionInfo" >
                        <label>Result Ability:</label>
                        <select value={action.resultAbility} onChange={this.handleActionChange(action.id, 'resultAbility')} >
                          <option value="none" >None</option>
                          {
                            map(abilities, (ab, index) => {
                              return (
                                <option key={uuidv4()} value={abilities[ab]} >{ab.name}</option>
                              )
                            })
                          }
                        </select>
                        <label>Result Bonus:</label>
                        <input type="number" value={action.resultBonus} onChange={this.handleActionChange(action.id, 'resultBonus')} />
                        <label>Result Dice:</label>
                        <input type="text" value={action.resultDice} onChange={this.handleActionChange(action.id, 'resultDice')} />
                        <button type="button" value={!action.resultActive} onClick={this.handleActionChange(action.id, 'resultActive')}>Remove Modifier</button>
                      </div>
                    } 
                    <button type="button" onClick={this.handleActionAddRemove(action.id)}>Remove Action</button>
                  </div>
                );
              })
            }
          </div>}
        </div>
      <button type="button" onClick={this.handleSubmit}>Save Character</button>
      <button type="button" onClick={this.handleCancel}>Cancel</button>
      </form>
    </div>);
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
    addCharacter: (characterInfo) => dispatch(addNewCharacter(characterInfo)),
  };
};

export default connect(null, mapDispatchToProps)(CharacterCreatePage);
