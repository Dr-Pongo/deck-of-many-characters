import React, { Component } from "react";
import "./styles.scss";
import AbilityEditor from './abilityEditor/index';
import map from 'lodash/map';
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
      proficiency: 0,
      abilities: {
        strength: {name: "Strength", val: 10, save: false, id:"158a7750-126a-4389-ab4a-c247cb09b783"},
        dexterity: {name: "Dexterity", val: 10, save: false, id:"fffadc2d-e76e-4b1a-adc6-3b07ee29e40a"},
        constitution: {name: "Constitution", val: 10, save: false, id:"6d2b5827-d3b2-4d52-9a67-a515ab7033a5"},
        intelligence: {name: "Intelligence", val: 10, save: false, id:"3903d58f-6fdb-4ba1-9b2b-1e6aefa4b9e5"},
        wisdom: {name: "Wisdom", val: 10, save: false, id:"fbbce06a-2395-49f2-99d0-4c169ae124bf"},
        charisma: {name: "Charisma", val: 10, save: false, id:"4a643c5e-11e4-4358-bc03-f51a0fd87905"},
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
      attacks: [],
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if(prevState.level !== this.state.level) {
      this.calculateProficiency();
    }
  };

  handleSkillButtonClick = (key, buttonLabel) => {
    this.setState({ 
      skills: { ...this.state.skills, 
        [key]: {...this.state.skills[key],
          [buttonLabel]: !this.state.skills[key][buttonLabel]
        }
      }
    })
  };
  
  updateAbility = (key) => (event) => {
    this.setState({ 
      abilities: {...this.state.abilities, 
        [key]:{...this.state.abilities[key], 
          val:parseInt(event.target.value)}}
    })
  };

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

  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (prof, exp, ability) => {
    if(prof) {
      if(exp) {
        return this.calculateAbilityModifier(this.state.abilities[ability].val) + this.state.proficiency * 2;
      } else {
        return this.calculateAbilityModifier(this.state.abilities[ability].val) + this.state.proficiency;
      }
    }
    return this.calculateAbilityModifier(this.state.abilities[ability].val);
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
                    <button className={skill.prof ? 'clicked' : ''} type="button" onClick={() => this.handleSkillButtonClick(index, 'prof')}>Proficiency</button>
                    {skill.prof && <button className={skill.exp ? 'clicked' : ''} type="button" onClick={() => this.handleSkillButtonClick(index, 'exp')}>Expertise</button>}
                </div>
              );
            }) }
        </div>
        <div className="saves" >
          <h3>Saves: </h3>
          { 
          }
        </div>
      <input type="submit" value="Submit" />
      </form>
    </div>);
  }
};

export default CharacterCreatePage;
