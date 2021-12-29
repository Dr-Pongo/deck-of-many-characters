import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import AbilityEditor from "./abilityEditor/index";
import map from "lodash/map";
// UUID DOCS: npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";
import { gotoPage, HOME_PAGE } from "../../containers/pageSlice";
import { addNewCharacter } from "../../containers/charactersSlice";
import DicePool from "../dicePoolComponent";

//GLOBALS
const SHOULD_BE_NUMBER = true;

class CharacterCreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv4(),
      name: "",
      level: 1,
      characterClass: "",
      subClass: "",
      proficiency: 2,
      abilities: {
        strength: { name: "Strength", val: 10, save: false, id: uuidv4() },
        dexterity: { name: "Dexterity", val: 10, save: false, id: uuidv4() },
        constitution: {
          name: "Constitution",
          val: 10,
          save: false,
          id: uuidv4(),
        },
        intelligence: {
          name: "Intelligence",
          val: 10,
          save: false,
          id: uuidv4(),
        },
        wisdom: { name: "Wisdom", val: 10, save: false, id: uuidv4() },
        charisma: { name: "Charisma", val: 10, save: false, id: uuidv4() },
      },
      skills: {
        /* Strength */
        athletics: {
          name: "Athletics",
          ability: "strength",
          prof: false,
          exp: false,
        },
        /* Dexterity */
        acrobatics: {
          name: "Acrobatics",
          ability: "dexterity",
          prof: false,
          exp: false,
        },
        sleightOfHand: {
          name: "Sleight of Hand",
          ability: "dexterity",
          prof: false,
          exp: false,
        },
        stealth: {
          name: "Stealth",
          ability: "dexterity",
          prof: false,
          exp: false,
        },
        /* Intelligence */
        arcana: {
          name: "Arcana",
          ability: "intelligence",
          prof: false,
          exp: false,
        },
        history: {
          name: "History",
          ability: "intelligence",
          prof: false,
          exp: false,
        },
        investigation: {
          name: "Investigation",
          ability: "intelligence",
          prof: false,
          exp: false,
        },
        nature: {
          name: "Nature",
          ability: "intelligence",
          prof: false,
          exp: false,
        },
        religion: {
          name: "Religion",
          ability: "intelligence",
          prof: false,
          exp: false,
        },
        /* Wisdom */
        animalHandling: {
          name: "Animal Handling",
          ability: "wisdom",
          prof: false,
          exp: false,
        },
        insight: {
          name: "Insight",
          ability: "wisdom",
          prof: false,
          exp: false,
        },
        medicine: {
          name: "Medicine",
          ability: "wisdom",
          prof: false,
          exp: false,
        },
        perception: {
          name: "Perception",
          ability: "wisdom",
          prof: false,
          exp: false,
        },
        survival: {
          name: "Survival",
          ability: "wisdom",
          prof: false,
          exp: false,
        },
        /* Charisma */
        deception: {
          name: "Deception",
          ability: "charisma",
          prof: false,
          exp: false,
        },
        intimidation: {
          name: "Intimidation",
          ability: "charisma",
          prof: false,
          exp: false,
        },
        performance: {
          name: "Performance",
          ability: "charisma",
          prof: false,
          exp: false,
        },
        persuasion: {
          name: "Persuasion",
          ability: "charisma",
          prof: false,
          exp: false,
        },
      },
      actions: [],
    };
  }

  /* ==================================== *
   * Lifecycle Method(s)                  *
   * ==================================== */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.level !== this.state.level) {
      this.calculateProficiency();
    }
  }

  /* ==================================== *
   * Helper Method(s)                     *
   * ==================================== */
  numericSelectOptions = (max, min = 0) => {
    let options = [];
    for (let p = min; p <= max; p++) {
      options.push({ value: p, label: `${p}` });
    }
    return options;
  };

  /* ==================================== *
   * Baisic Character Method(s)           *
   * ==================================== */
  updateBasicInfoValue =
    (key, shouldBeNumber = false) =>
    (event) => {
      if (!shouldBeNumber) {
        this.setState({ [key]: event.target.value });
        return;
      }
      if (event.target.value.length < 1) {
        return;
      }
      let iNum = parseInt(event.target.value);
      if (isNaN(iNum) || iNum < 1) {
        iNum = 1;
      }
      if (iNum > 20) {
        iNum = 20;
      }
      this.setState({ [key]: iNum });
    };

  calculateProficiency = () => {
    const curLevel = this.state.level;
    switch (true) {
      case curLevel < 5:
        this.setState({ proficiency: 2 });
        break;
      case curLevel < 9:
        this.setState({ proficiency: 3 });
        break;
      case curLevel < 13:
        this.setState({ proficiency: 4 });
        break;
      case curLevel < 17:
        this.setState({ proficiency: 5 });
        break;
      default:
        this.setState({ proficiency: 6 });
    }
  };

  /* ==================================== *
   * Ability Method(s)                    *
   * ==================================== */
  updateAbility = (key) => (event) => {
    let iNum = parseInt(event.target.value);
    if (event.target.value.length < 1) {
      return;
    }
    if (isNaN(iNum) || iNum < 0) {
      iNum = 0;
    }
    if (iNum > 30) {
      iNum = 30;
    }

    this.setState({
      abilities: {
        ...this.state.abilities,
        [key]: { ...this.state.abilities[key], val: iNum },
      },
    });
  };

  handleAbilitySave =
    (key) =>
    ({ target }) => {
      this.setState({
        abilities: {
          ...this.state.abilities,
          [key]: {
            ...this.state.abilities[key],
            save: target.value === "true",
          },
        },
      });
    };

  calculateAbilityModifier = (abilityValue) => {
    return Math.floor((abilityValue - 10) / 2);
  };

  deriveSkillValue = (prof, exp, ability) => {
    const abilityValue = this.calculateAbilityModifier(
      this.state.abilities[ability].val
    );
    if (prof) {
      return exp
        ? abilityValue + this.state.proficiency * 2
        : abilityValue + this.state.proficiency;
    }
    return abilityValue;
  };

  /* ==================================== *
   * Skill Method(s)                      *
   * ==================================== */
  handleProfSkillButtonClick = (key) => {
    // Can't have expertise without proficiency!
    if (this.state.skills[key].prof && this.state.skills[key].exp) {
      this.setState({
        skills: {
          ...this.state.skills,
          [key]: {
            ...this.state.skills[key],
            prof: !this.state.skills[key].prof,
            exp: false,
          },
        },
      });
      return;
    }
    this.setState({
      skills: {
        ...this.state.skills,
        [key]: {
          ...this.state.skills[key],
          prof: !this.state.skills[key].prof,
        },
      },
    });
  };

  handleExpSkillButtonClick = (key) => {
    this.setState({
      skills: {
        ...this.state.skills,
        [key]: { ...this.state.skills[key], exp: !this.state.skills[key].exp },
      },
    });
  };

  /* ==================================== *
   * Action Method(s)                     *
   * ==================================== */
  handleActionAddRemove =
    (removeID = 0) =>
    () => {
      // Empty Action object
      const initialAction = {
        // must Haves
        id: uuidv4(),
        name: "",
        proficiency: false,
        // attempt
        attemptActive: false,
        attemptAbility: "",
        attemptBonus: 0,
        // result
        resultActive: false,
        resultAbility: "",
        resultBonus: 0,
        resultDice: [],
      };

      // If a remove ID is recieved, removed selected ID from the current actions list
      // Otherwise add a new initialAction from above
      const actions = removeID
        ? this.state.actions.filter((action) => action.id !== removeID)
        : [...this.state.actions, initialAction];

      this.setState({
        actions,
      });
    };

  handleActionChange =
    (actionID, actionKeyValue) =>
    ({ target }) => {
      // We need some type checks here so we don't get 'true' instead of a good true...
      let newValue;
      switch (actionKeyValue) {
        case "proficiency":
        case "attemptActive":
        case "resultActive":
          newValue = target.value === "true";
          break;
        case "attemptBonus":
        case "resultBonus":
          newValue = parseInt(target.value);
          break;
        default:
          newValue = target.value;
      }

      const actions = this.state?.actions.map((action) => {
        return action.id === actionID
          ? { ...action, [actionKeyValue]: newValue }
          : action;
      });

      this.setState({
        actions,
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
  };
  handleCancel = () => {
    // nuke changes and return to the Home Page
    this.props.updateCurrentPage(HOME_PAGE);
  };

  /* ==================================== *
   * Render Time!                         *
   * ==================================== */
  render() {
    const { abilities, skills, level, proficiency } = this.state;
    return (
      <div className="create-char main-page">
        <h2>Character Creation</h2>
        <form className="char-create-form">
          <div className="core-info">
            <div className="input-combo">
              <label htmlFor="charName">Character Name</label>
              <input
                type="text"
                name="charName"
                className="core-input"
                onChange={this.updateBasicInfoValue("name")}
              />
            </div>
          </div>
          <div className="core-info">
            <div className="input-combo">
              <label htmlFor="level">Level</label>
              <input
                type="number"
                name="level"
                className="core-input"
                max="20"
                min="1"
                value={level}
                onChange={this.updateBasicInfoValue("level", SHOULD_BE_NUMBER)}
              />
            </div>
            <div className="input-combo">
              <label>Proficiency Mod</label>
              <p className="input-sized-p">+{proficiency}</p>
            </div>
          </div>
          <div className="core-info">
            <div className="input-combo">
              <label htmlFor="className">Class</label>
              <input
                type="text"
                name="className"
                className="core-input"
                onChange={this.updateBasicInfoValue("characterClass")}
              />
            </div>
            <div className="input-combo">
              <label htmlFor="subClassName">Subclass</label>
              <input
                type="text"
                name="subClassName"
                className="core-input"
                onChange={this.updateBasicInfoValue("subClass")}
              />
            </div>
          </div>
          <div className="row-info-display">
            {map(abilities, (ab, index) => {
              return (
                <AbilityEditor
                  key={ab.id}
                  ability={ab}
                  handleChange={this.updateAbility(index)}
                />
              );
            })}
          </div>
          <div className="additional-information">
            <div className="skills column-info-display">
              <div className="column-info-header">
                <h3>Skills</h3>
                <div className='prof-exp-label' >
                  <p>Prof</p>
                  <p>Exp</p>
                </div>
              </div>
              {map(skills, (skill, index) => {
                return (
                  <div
                    className="skill-editor"
                    key={`${skill.name}-${skill.ability}`}
                  >
                    <h4 className="skill-editor-name">{skill.name}</h4>
                    <div className="skill-editor-stuff">
                      <p className="skill-editor-val">
                        {this.deriveSkillValue(
                          skill.prof,
                          skill.exp,
                          skill.ability
                        )}
                      </p>
                      <div className="skill-editor-buttons">
                        <button
                          className={
                            skill.prof ? "skill-btn clicked" : "skill-btn"
                          }
                          type="button"
                          onClick={() =>
                            this.handleProfSkillButtonClick(index, "prof")
                          }
                        />
                        {!skill.prof && (
                          <button className="skill-btn disabled" type="button"/>
                        )}
                        {skill.prof && (
                          <button
                            className={
                              skill.exp ? "skill-btn clicked" : "skill-btn"
                            }
                            type="button"
                            onClick={() =>
                              this.handleExpSkillButtonClick(index, "exp")
                            }
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              }).sort((first, second) => {
                return first.key < second.key ? -1 : 1;
              })}
            </div>
            <div className="column-info-display">
              <div className="column-info-header">
                <h3>Saving Throws </h3>
                <div className='prof-exp-label-save' >
                  Prof
                </div>
              </div>
              {map(abilities, (ab, index) => {
                return (
                  <div className="save-editor" key={ab.id}>
                    {/* Printing out Ability Modifier, adding proficiency if ability save is true */}
                    <h4 className="save-editor-name">{ab.name}</h4>
                    <div className="save-editor-stuff">
                      <p className="save-editor-val">{`${
                        ab.save
                          ? this.calculateAbilityModifier(ab.val) +
                            this.state.proficiency
                          : this.calculateAbilityModifier(ab.val)
                      }`}</p>
                      <button
                        className={ab.save ? "skill-btn clicked" : "skill-btn"}
                        type="button"
                        value={!ab.save}
                        onClick={this.handleAbilitySave(index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* ================================== *
              * ACTIONS!                           *
              * ================================== */}
            <div className="column-info-display">
              <div className='column-info-display'>
                <h3>Actions!</h3>
                <button type="button" className='action-button' onClick={this.handleActionAddRemove()}>
                  Add Action!
                </button>
              </div>
              {this.state.actions.map((action, index) => {
                return (
                  <div key={action.id} className="column-info-display action">
                    <div className='action-header'>
                      {/* <button
                        type="button"
                        className='close'
                        onClick={this.handleActionAddRemove(action.id)}
                      >
                        X
                      </button> */}
                    </div>
                    <div className="column-info-display">
                      <label>Action Name</label>
                      <input
                        type="text"
                        className='action-input'
                        value={action.name}
                        onChange={this.handleActionChange(action.id, "name")}
                      />
                    </div>
                    {!action.attemptActive && (
                      <button
                        type="button"
                        className='action-button'
                        value={!action.attemptActive}
                        onClick={this.handleActionChange(
                          action.id,
                          "attemptActive"
                        )}
                      >
                        Attempt Modifier
                      </button>
                    )}
                    {/* =====================
                        ATTEMPT SECTION
                        ===================== */}
                    {action.attemptActive && (
                      <div className='attempt-row'>
                        <label>Attempt Ability</label>
                        <select
                          value={action.attemptAbility}
                          className='action-input'
                          onChange={this.handleActionChange(
                            action.id,
                            "attemptAbility"
                          )}
                        >
                          <option value="none">None</option>
                          {map(abilities, (ab, index) => {
                            return (
                              <option key={uuidv4()} value={abilities[ab]}>
                                {ab.name}
                              </option>
                            );
                          })}
                        </select>
                        <button
                          className='attempt-prof-btn'
                          type="button"
                          onClick={this.handleActionChange(
                            action.id,
                            "proficiency"
                          )}
                        />
                        <button className="attempt-prof-btn disabled" type="button"/>
                        <p> + </p>
                        <input
                          type="number"
                          className='action-mod-input'
                          value={action.attemptBonus}
                          onChange={this.handleActionChange(
                            action.id,
                            "attemptBonus"
                          )}
                        />
                        <button
                          type="button"
                          className='close'
                          value={!action.attemptActive}
                          onClick={this.handleActionChange(
                            action.id,
                            "attemptActive"
                          )}
                        >
                        X
                        </button>
                      </div>
                    )}
                    {!action.resultActive && (
                      <button
                        type="button"
                        className='action-button'
                        value={!action.resultActive}
                        onClick={this.handleActionChange(
                          action.id,
                          "resultActive"
                        )}
                      >
                        Result Modifier
                      </button>
                    )}
                    {/* =====================
                        RESULT SECTION
                        ===================== */}
                    {action.resultActive && (
                      <div className='result-display'>
                        <div className='result-row'>
                          <label>Result Ability</label>
                          <select
                            value={action.resultAbility}
                            className='action-input'
                            onChange={this.handleActionChange(
                              action.id,
                              "resultAbility"
                            )}
                          >
                            <option value="none">None</option>
                            {map(abilities, (ab, index) => {
                              return (
                                <option key={uuidv4()} value={abilities[ab]}>
                                  {ab.name}
                                </option>
                              );
                            })}
                          </select>
                            <p>+</p>
                            <input
                              type="number"
                              className='action-mod-input'
                              value={action.resultBonus}
                              onChange={this.handleActionChange(
                                action.id,
                                "resultBonus"
                              )}
                            />
                          <button
                            type="button"
                            className='close'
                            value={!action.resultActive}
                            onClick={this.handleActionChange(
                              action.id,
                              "resultActive"
                            )}
                          >
                          X
                          </button>
                        </div>
                        <DicePool />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="form-complete-buttons">
            <button id="save" type="button" onClick={this.handleSubmit}>
              Save
            </button>
            <button id="cancel" type="button" onClick={this.handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
    addCharacter: (characterInfo) => dispatch(addNewCharacter(characterInfo)),
  };
};

export default connect(null, mapDispatchToProps)(CharacterCreatePage);
