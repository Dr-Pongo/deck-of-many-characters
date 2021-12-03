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
      attacks: [],
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
   * Attack Method(s)                     *
   * ==================================== */
  handleAttackAdd = () => {
    this.setState({
      attacks: [...this.state.attacks, {
        id: uuidv4(),
        name: '', 
        attackStat: '',
        proficiency: false,
        damageDice: '',
      }]
    })
  };

  handleAttackRemove = (removeID) => {
    const newAttacks = this.state.attacks.filter((attack) => attack.id !== removeID);
    this.setState({
      attacks: newAttacks
    })
  };
  
  //So this probably isn't the best way to handle this
  handleAttackNameChange = (id, value) => {
    const newAttacks = this.state?.attacks.map(attack => {
      return attack.id === id ? {...attack, name: value} : attack;
    });

    this.setState({
      attacks: newAttacks
    });
  }

  handleAttackDamageChange = (id, value) => {
    const newAttacks = this.state?.attacks.map(attack => {
      return attack.id === id ? {...attack, damageDice: value} : attack;
    });

    this.setState({
      attacks: newAttacks
    });
  }

  handleAttackProficiencyChange = (id) => {
    const newAttacks = this.state?.attacks.map(attack => {
      return attack.id === id ? {...attack, proficiency: !attack.proficiency} : attack;
    });

    this.setState({
      attacks: newAttacks
    });
  };

  /* =========================
   * Generic Attack Function
   * =========================
   */
    // need attack.id, key, newValue
  handleAttackChange = (attackId, attackKeyValue) => ({target}) => {
    const attacks = this.state?.attacks.map(attack => {
      return attack.id === attackId ? {...attack, [attackKeyValue]: target.value} : attack;
    });

    this.setState({
      attacks
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
          <h3>Saves: </h3>
          { 
          }
        </div>
        <div className="attacks" >
          <h3>Attacks!: </h3>
          { 
            this.state.attacks.map((attack, index) => {
              return (
                <div key={attack.id} className="attack" >
                  <h4>Attack #{index}</h4>
                  <div className="attackInfo">
                    <label>Attack Name: </label>
                    <input type="text" value={attack.name} onChange={this.handleAttackChange(attack.id, 'text')} />
                  </div>
                  <div className="attackInfo" >
                    <label>Damage:</label>
                    <input type="text" value={attack.damageDice} onChange={({target}) => this.handleAttackDamageChange(attack.id, target.value)} />
                  </div> 
                  <button type="button" className={attack.proficiency ? 'clicked' : ''} onClick={() => this.handleAttackProficiencyChange(attack.id)} >Proficient</button>
                  <button type="button" onClick={() => this.handleAttackRemove(attack.id)}>Remove</button>
                </div>
              );
            })
          }
          <button type="button" onClick={this.handleAttackAdd} >Add Attaack!</button>
        </div>
      <input type="submit" value="Submit" />
      </form>
    </div>);
  }
};

export default CharacterCreatePage;
