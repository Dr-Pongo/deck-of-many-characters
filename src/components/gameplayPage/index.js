import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import map from "lodash/map";
import { v4 as uuidv4 } from "uuid";
import { gotoPage, HOME_PAGE } from "../../containers/pageSlice";
import DiceRoller from "../diceRollerComponent/index";
import { addAbilitySkillRoll } from "../../containers/diceTraySlice";

class GameplayPage extends Component {
  constructor(props) {
    super(props);
    this.rollerRef = React.createRef();
  }

  /* ==================================== *
   * handleAbilityRoll                    *
   * ==================================== */
  handleAbilityRoll = (ability, save = false) => {
    const { proficiency } = this.props.currentCharacter;
    const diceToAdd = [{ name: "d20", value: 20, key: uuidv4() }];
    const modifierToAdd = this.calculateAbilityModifier(ability.val);
    this.props.addAbilitySkillRoll({
      roll: diceToAdd,
      mod: save ? modifierToAdd + proficiency : modifierToAdd,
    });
    this.rollerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* ==================================== *
   * handleSkillRoll                      *
   * ==================================== */
  handleSkillRoll = (skill) => {
    const diceToAdd = [{ name: "d20", value: 20, key: uuidv4() }];
    const modifierToAdd = this.deriveSkillValue(skill);
    this.props.addAbilitySkillRoll({ roll: diceToAdd, mod: modifierToAdd });
    this.rollerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* ==================================== *
   * handleProficiencyMod                 *
   * ==================================== */
  handleProficiencyMod = () => {
    const { proficiency } = this.props.currentCharacter;
    this.props.addAbilitySkillRoll({
      roll: [],
      mod: proficiency,
    });
  };

  /* ==================================== *
   * handleActionRolls!                   *
   * ==================================== */
  handleActionAttemptRoll = (action) => {
    const { proficiency, abilities } = this.props.currentCharacter;
    // add d20, and modifier to dice pool
    const diceToAdd = [{ name: "d20", value: 20, key: uuidv4() }];

    // Grabbing modifier depending on attemptAbility and attempt bonus
    let modifier = action.attemptAbility !== 'none' ? 
      this.calculateAbilityModifier(abilities[action.attemptAbility.toLowerCase()].val) + action.attemptBonus : 
      action.attemptBonus;
    
    if (action.proficiency) {
       modifier = action.expertise
        ? modifier + proficiency * 2
        : modifier + proficiency;
    }

    this.props.addAbilitySkillRoll( { roll: diceToAdd, mod: modifier } );
    this.rollerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* ==================================== *
   * handleActionResultRolls!                   *
   * ==================================== */
  handleActionResultRoll = (action) => {
    const { abilities } = this.props.currentCharacter;

    // add d20, and modifier to dice pool
    let diceToAdd = [];
    map(action.resultDice, (die, index) => {
      for (let p = 0; p < die; p++) {
        diceToAdd.push({ name: index, value: parseInt(index.substring(1)), key: uuidv4() });
      }
    });

    // Grabbing modifier depending on resultAbility and result bonus
    let modifier = action.resultAbility !== 'none' ? 
      this.calculateAbilityModifier(abilities[action.resultAbility.toLowerCase()].val) + action.resultBonus : 
      action.resultBonus;
    
    this.props.addAbilitySkillRoll({ 
      roll: diceToAdd, 
      mod: modifier
    });

    this.rollerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  /* ==================================== *
   * Helpers                              *
   * ==================================== */
  calculateActionModifiers = (ability, bonus, attempt = false, proficiency, expertise) => {
    // let modifier = ability !== 'none' ? 
    //   this.calculateAbilityModifier(abilities[ability.toLowerCase()].val) + bonus : 
    //   bonus;
    
    // if(attempt) {
    //   if (action.proficiency) {
    //     modifier = action.expertise
    //      ? modifier + proficiency * 2
    //      : modifier + proficiency;
    //   }
    // }
    // return modifier;
  }

  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (iSkill) => {
    const { proficiency, abilities } = this.props.currentCharacter;
    const abilityValue = this.calculateAbilityModifier(
      abilities[iSkill.ability].val
    );
    if (iSkill.prof) {
      return iSkill.exp
        ? abilityValue + proficiency * 2
        : abilityValue + proficiency;
    }
    return abilityValue;
  };

  deriveSaveValue = (ability) => {
    const { proficiency } = this.props.currentCharacter;
    let modifier = this.calculateAbilityModifier(ability.val);

    if (ability.save) modifier = modifier + proficiency;
    if (modifier >= 0) return `+${modifier}`;
    return modifier;
  };

  deriveAbilityScore = (score) => {
    const modifier = this.calculateAbilityModifier(score);
    if (modifier >= 0) return `${score} (+${modifier})`;
    return `${score} (${modifier})`;
  };

  /* ==================================== *
   * Render Time                          *
   * ==================================== */
  render() {
    const {
      name,
      level,
      proficiency,
      subClass,
      abilities,
      skills,
      actions,
      characterClass,
    } = this.props.currentCharacter;
    return (
      <div className="gameplay main-page" ref={this.rollerRef}>
        <h2>{name || "Unamed"}</h2>
        <div className="subheading">{`Level ${level} ${subClass || ""} ${
          characterClass || "Character"
        }`}</div>
        <div>
          <button type="button" className="prof-mod" onClick={this.handleProficiencyMod} >
            <div className="roll-name">{`Proficiency +${proficiency}`}</div>
          </button>
        </div>
        <DiceRoller />
        <div className="basicInfo">
          <div className="abilities">
            <h3>Roll Ability Checks</h3>
            <div className="buttons-list">
              {map(abilities, (ab, index) => {
                return (
                  <button
                    type="button"
                    className="core-ability"
                    onClick={() => this.handleAbilityRoll(ab)}
                    key={`${ab.name}+${index}`}
                  >
                    <div className="roll-name">{ab.name}</div>
                    <div className="roll-value">
                      {this.deriveAbilityScore(ab.val)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="additionalInfo">
          <div className="saves">
            <h3>Roll Saving Throws </h3>
            <div className="buttons-list">
              {map(abilities, (ab, index) => {
                return (
                  <button
                    type="button"
                    className="save"
                    key={ab.id}
                    onClick={() => this.handleAbilityRoll(ab, ab.save)}
                  >
                    <div className="roll-name">{ab.name}</div>
                    <div className="roll-value">{this.deriveSaveValue(ab)}</div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="skills">
            <h3>Roll Skills</h3>
            <div className="buttons-list">
              {map(skills, (skill, index) => {
                const skillValue = this.deriveSkillValue(skill);
                return (
                  <button
                    type="button"
                    className="skill-button"
                    onClick={() => this.handleSkillRoll(skill)}
                    key={`${skill.name}-${skill.ability}`}
                  >
                    <div className="roll-name">{skill.name}</div>
                    <div className="roll-value">
                      {skillValue >= 0 ? `+${skillValue}` : skillValue}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="actions">
            <h3>Actions!</h3>
            {map(actions, (action, index) => {
              return (
                <div key={action.id} className="action" >
                  <label>{action.name || "Unamed Action"}</label>
                  {action.attemptActive && 
                  <button 
                    type="button" 
                    className="skill-button" 
                    onClick={() => this.handleActionAttemptRoll(action)} 
                  >
                    Attempt
                    {/* {`Attempt +${}`} */}
                  </button>}
                  {action.resultActive && 
                  <button 
                    type="button" 
                    className="skill-button" 
                    onClick={() => this.handleActionResultRoll(action)}
                  >
                    Result
                  </button>}
                  {action.description && <p>{action.description}</p>}
                </div>
              );
            })}
          </div>
        </div>
        <button
          onClick={() => this.props.updateCurrentPage(HOME_PAGE)}
          type="button"
          className="go-home-button"
        >
          Return Home
        </button>
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
