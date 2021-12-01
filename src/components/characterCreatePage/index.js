import React, { Component } from "react";
import "./styles.scss";
import AbilityEditor from './abilityEditor/index';

class CharacterCreatePage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state = {
      name: '',
      level: 1,
      class: '',
      subclass: '',
      profciency: 0,
      abilities: {
        strength: {val: 0, save: false},
        dextarity: {val: 0, save: false},
        constitution: {val: 0, save: false},
        intelligence: {val: 0, save: false},
        wisdom: {val: 0, save: false},
        charisma: {val: 0, save: false},
      },
      skills: [
        /* Strength */
        {name: "Athletics", ability: "strength", prof: false, exp: false},
        /* Dexterity */
        {name: "Acrobatics", ability: "dexterity", prof: false, exp: false},
        {name: "Sleight of Hand", ability: "dexterity", prof: false, exp: false},
        {name: "Stealth", ability: "dexterity", prof: false, exp: false},
        /* Intelligence */
        {name: "Arcana", ability: "intelligence", prof: false, exp: false},
        {name: "History", ability: "intelligence", prof: false, exp: false},
        {name: "Investigation", ability: "intelligence", prof: false, exp: false},
        {name: "Nature", ability: "intelligence", prof: false, exp: false},
        {name: "Religion", ability: "intelligence", prof: false, exp: false},
        /* Wisdom */
        {name: "Animal Handling", ability: "wisdom", prof: false, exp: false},
        {name: "Insight", ability: "wisdom", prof: false, exp: false},
        {name: "Medicine", ability: "wisdom", prof: false, exp: false},
        {name: "Perception", ability: "wisdom", prof: false, exp: false},
        {name: "Survival", ability: "wisdom", prof: false, exp: false},
        /* Charisma */
        {name: "Deception", ability: "charisma", prof: false, exp: false},
        {name: "Intimidation", ability: "charisma", prof: false, exp: false},
        {name: "Performance", ability: "charisma", prof: false, exp: false},
        {name: "Persuasion", ability: "charisma", prof: false, exp: false},
      ],
    };
  }

  handleAbilityChange = (abilityName, abilityVal) => {
      this.setState({...this.state, 
        abilities: {...this.state.abilities, 
          [abilityName]:{...this.state.abilities.strength, 
            val:abilityVal}}
      })
  }

  render() {
    return (
    <div className="page" >
      <h2>Character Creation</h2>
      <form>
        <div className="basicInfo">
          <label>Character Name: 
            <input type="text" 
              onChange={({target}) => this.setState({...this.state, name: target.value})} 
              required />
          </label>
          <label>Level: 
            <input type="number" 
              max="20" min="1" 
              value={this.state.level} 
              onChange={({target}) => this.setState({...this.state, level: target.value})} 
              required />
          </label>
          <label>Class: 
            <input type="text" 
              onChange={({target}) => this.setState({...this.state, class: target.value})} 
              required />
          </label>
          <label>SubClass: 
            <input type="text" onChange={({target}) => this.setState({...this.state, subclass: target.value})} />
          </label>
        </div>
        <div className="abilities" >
          {
            Object.keys(this.state.abilities).map(ab => {
              return (
                <AbilityEditor
                  abilityName={ab}
                  abilityVal={this.state.abilities[ab].val} 
                  handleChange={this.handleAbilityChange} />
              );
            })
          }
        </div>
      <input type="submit" value="Submit" />
      </form>
    </div>);
  }
}

export default CharacterCreatePage;
