import React, { Component } from "react";
import "./styles.scss";
import AbilityEditor from './abilityEditor/index';
import SkillEditor from './skillEditor/index'
import map from 'lodash/map';

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

  handleSkillChange = (key) => {
    // TODO: update based on key that will probably need to be added 
  };
  
  updateAbility = (key) => (event) => {
    this.setState({ 
      abilities: {...this.state.abilities, 
        [key]:{...this.state.abilities[key], 
          val:event.target.value}}
    })
  };

  updateBasicInfoValue = (key) => (event) => {
    this.setState({ [key]: event.target.value, });
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
              onChange={this.updateBasicInfoValue('name')} 
              required />
          </label>
          <label>Level: 
            <input type="number" 
              max="20" min="1" 
              value={level} 
              onChange={this.updateBasicInfoValue('level')} 
              required />
          </label>
          <label>Class: 
            <input type="text" 
              onChange={this.updateBasicInfoValue('class')} 
              required />
          </label>
          <label>SubClass: 
            <input type="text" onChange={this.updateBasicInfoValue('subclass')} />
          </label>
        </div>
        <div className="abilities" >
          { 
            map(abilities, (ab, thisIsAVariableNameThatImUsingHere) => {
                return (
                  <AbilityEditor
                    key={ab.id}
                    ability={ab}
                    handleChange={this.updateAbility(thisIsAVariableNameThatImUsingHere)} />
                )
            })
          }
        </div>
        <div className="skills" >
          <h3>Skills: </h3>
          {
            map(skills, (skill) => {
              return (
                <SkillEditor
                  key={skill.name + skill.ability}
                  skill={skill}
                  handleChange={this.handleSkillChange} />
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
