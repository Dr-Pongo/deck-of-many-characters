import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles.scss";
import AbilityEditor from "../characterCreatePage/abilityEditor/index";
import map from "lodash/map";
// UUID DOCS: npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";
import { gotoPage, HOME_PAGE } from "../../containers/pageSlice";
import { updateCharacter } from "../../containers/charactersSlice";
import { WIP_COMPONENT } from "../app/index";

//GLOBALS
const SHOULD_BE_NUMBER = true;

class CharacterEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.currentCharacter,
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
        resultDice: "",
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
    this.props.updateCharacter(this.state);
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
    const {
      abilities,
      skills,
      level,
      proficiency,
      name,
      characterClass,
      subClass,
    } = this.state;
    return (
      <div className="create-char main-page">
        <h2>Character Edit</h2>
        <form className="char-create-form">
          <div className="core-info">
            <div className="input-combo">
              <label htmlFor="charName">Character Name</label>
              <input
                type="text"
                name="charName"
                className="core-input"
                value={name}
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
                value={characterClass}
                onChange={this.updateBasicInfoValue("characterClass")}
              />
            </div>
            <div className="input-combo">
              <label htmlFor="subClassName">Subclass</label>
              <input
                type="text"
                name="subClassName"
                className="core-input"
                value={subClass}
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
                {/* <p>Proficiency</p>
              <p>Expertise</p> */}
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
                        >
                          {" "}
                          P{" "}
                        </button>
                        {!skill.prof && (
                          <button className="skill-btn disabled" type="button">
                            {" "}
                            E{" "}
                          </button>
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
                          >
                            {" "}
                            E{" "}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="column-info-display">
              <div className="column-info-header">
                <h3>Saving Throws </h3>
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
                        className={ab.save ? "save-btn clicked" : "save-btn"}
                        type="button"
                        value={!ab.save}
                        onClick={this.handleAbilitySave(index)}
                      >
                        {" "}
                        P{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {WIP_COMPONENT && (
              <div className="actions">
                <h3>Actions!</h3>
                <button type="button" onClick={this.handleActionAddRemove()}>
                  Add Action!
                </button>
                {this.state.actions.map((action, index) => {
                  return (
                    <div key={action.id} className="action">
                      <h4>Action #{index}</h4>
                      <div className="action-info">
                        <label>Action Name: </label>
                        <input
                          type="text"
                          value={action.name}
                          onChange={this.handleActionChange(action.id, "name")}
                        />
                        <button
                          type="button"
                          className={action.proficiency ? "clicked" : ""}
                          value={!action.proficiency}
                          onClick={this.handleActionChange(
                            action.id,
                            "proficiency"
                          )}
                        >
                          Proficiency
                        </button>
                      </div>
                      {!action.attemptActive && (
                        <button
                          type="button"
                          value={!action.attemptActive}
                          onClick={this.handleActionChange(
                            action.id,
                            "attemptActive"
                          )}
                        >
                          Attempt Modifier
                        </button>
                      )}
                      {action.attemptActive && (
                        <div className="actionInfo">
                          <label>Attempt Ability:</label>
                          <select
                            value={action.attemptAbility}
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
                          <label>Attempt Bonus:</label>
                          <input
                            type="number"
                            value={action.attemptBonus}
                            onChange={this.handleActionChange(
                              action.id,
                              "attemptBonus"
                            )}
                          />
                          <button
                            type="button"
                            value={!action.attemptActive}
                            onClick={this.handleActionChange(
                              action.id,
                              "attemptActive"
                            )}
                          >
                            Remove Modifier
                          </button>
                        </div>
                      )}
                      {!action.resultActive && (
                        <button
                          type="button"
                          value={!action.resultActive}
                          onClick={this.handleActionChange(
                            action.id,
                            "resultActive"
                          )}
                        >
                          Result Modifier
                        </button>
                      )}
                      {action.resultActive && (
                        <div className="actionInfo">
                          <label>Result Ability:</label>
                          <select
                            value={action.resultAbility}
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
                          <label>Result Bonus:</label>
                          <input
                            type="number"
                            value={action.resultBonus}
                            onChange={this.handleActionChange(
                              action.id,
                              "resultBonus"
                            )}
                          />
                          <label>Result Dice:</label>
                          <input
                            type="text"
                            value={action.resultDice}
                            onChange={this.handleActionChange(
                              action.id,
                              "resultDice"
                            )}
                          />
                          <button
                            type="button"
                            value={!action.resultActive}
                            onClick={this.handleActionChange(
                              action.id,
                              "resultActive"
                            )}
                          >
                            Remove Modifier
                          </button>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={this.handleActionAddRemove(action.id)}
                      >
                        Remove Action
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
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
    updateCharacter: (character) => dispatch(updateCharacter(character)),
  };
};

const mapStateToProps = (state) => {
  return {
    currentCharacter: state.characters[state.selectedCharacter],
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CharacterEditPage);
