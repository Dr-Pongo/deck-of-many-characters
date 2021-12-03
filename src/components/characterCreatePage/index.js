import React, { Component } from "react";
import "./styles.scss";
import AbilityEditor from './abilityEditor/index';
import map from 'lodash/map';
import {v4 as uuidv4} from 'uuid';
// UUID DOCS: npmjs.com/package/uuid

//GLOBALS
const SHOULD_BE_NUMBER = true;

class CharacterCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      level: 1,
      class: '',
      subclass: '',
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
   * Skill Method(s)                      *
   * ==================================== */
  handleProfSkillButtonClick = (key) => {
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
    this.setState({ 
      abilities: {...this.state.abilities, 
        [key]:{...this.state.abilities[key], 
          val:parseInt(event.target.value)}}
    })
  };

  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (prof, exp, ability) => {
    const abilityValue = this.calculateAbilityModifier(this.state.abilities[ability].val);
    if(prof) {
      console.log(`${this.state.proficiency}`);
      return exp ? (abilityValue + this.state.proficiency * 2) : (abilityValue + this.state.proficiency);
    }
    return abilityValue;
  };


  
  /* ==================================== *
   * Action Method(s)                     *
   * ==================================== */
  handleActionAddRemove = (removeID = 0) => () => {
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
      resulteDice: '',
    };


    // TODO: [Insert something that explains here]
    const actions = removeID ? 
      this.state.actions.filter((action) => action.id !== removeID) :
      [...this.state.actions, initialAction];

    this.setState({
      actions
    });
  };
  
  handleActionChange = (actionID, actionKeyValue) => ({target}) => {
    console.log(`Handle Action Change \nactionKeyValue:${actionKeyValue}\ntargetValue:${target.value}`);
    
    const actions = this.state?.actions.map(action => {
      return action.id === actionID ? {...action, [actionKeyValue]: target.value} : action;
    });

    this.setState({
      actions
    });
  };


  render() {
    const {abilities, skills, level} = this.state;
    return (
    <div className="page" >
      <h2>Character Creation</h2>
      <form>
        <div className="basicInfo">
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
            <input type="text" onChange={this.updateBasicInfoValue('subclass')} />
          </label>
        </div>
        <div className="abilities" >
          { map(abilities, (ab, index) => {
                return (
                  <AbilityEditor
                    key={ab.id}
                    ability={ab}
                    handleChange={this.updateAbility(index)} />
                )
            }) }
        </div>
        <div className="skills" >
          <h3>Skills: </h3>
          { map(skills, (skill, index) => {
              return (
                <div className="skillEditor" key={`${skill.name}-${skill.ability}`}>
                    <h4>{skill.name}: </h4>
                    <p>{this.deriveSkillValue(skill.prof, skill.exp, skill.ability)}</p>
                    <button className={skill.prof ? 'clicked' : ''} type="button" onClick={() => this.handleProfSkillButtonClick(index, 'prof')}>Proficiency</button>
                    {skill.prof && <button className={skill.exp ? 'clicked' : ''} type="button" onClick={() => this.handleExpSkillButtonClick(index, 'exp')}>Expertise</button>}
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
                   <p>{`${this.calculateAbilityModifier(ab.val)}` + ab.save ? this.state.proficiency : 0}</p>
                 </div> 
                )
            }) }
        </div>
        <div className="actions" >
          <h3>Actions!</h3>
          <button type="button" onClick={this.handleActionAddRemove()} >Add Attaack!</button>
          { 
            this.state.actions.map((action, index) => {
              return (
                <div key={action.id} className="action" >
                  <h4>Action #{index}</h4>
                  <div className="actionInfo">
                    <label>Action Name: </label>
                    <input type="text" value={action.name} onChange={this.handleActionChange(action.id, 'name')} />
                    <button type="button" className={action.proficiency ? 'clicked' : ''} value={!action.proficiency} onClick={this.handleActionChange(action.id, 'proficiency')} >Proficient</button>
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


                  {/* {!action.resultActive && <button type="button" onClick={this.handleActionAddRemove(action.id)}>Result Modifier</button>} */}
                  {/* {action.resultActive && 
                    <div className="actionInfo" >
                      <label>Result:</label>
                      <input type="text" value={action.resultDice} onChange={this.handleActionChange(action.id, 'resultDice')} />
                      <button type="button" onClick={this.handleActionAddRemove(action.id)}>Remove Modifier</button>
                    </div> 
                  } */}
                  <button type="button" onClick={this.handleActionAddRemove(action.id)}>Remove Action</button>
                </div>
              );
            })
          }
        </div>
      <input type="submit" value="Submit" />
      </form>
    </div>);
  }
};

export default CharacterCreatePage;
