import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import {
  selectCharacters,
  removeCharacter,
} from "../../containers/charactersSlice";
import {
  gotoPage,
  CREATE_PAGE,
  EDIT_PAGE,
  PLAY_PAGE,
} from "../../containers/pageSlice";
import { setSelectedCharacter } from "../../containers/selectedCharacterSlice";
import DiceRoller from "../diceRollerComponent/index";
import map from "lodash/map";

const LandingPage = () => {
  const dispatch = useDispatch();
  const charList = useSelector(selectCharacters);

  const handleEdit = (id) => {
    //Set Current Character
    dispatch(setSelectedCharacter(id));
    // Go to Edit Page
    dispatch(gotoPage(EDIT_PAGE));
  };

  const handlePlay = (id) => {
    //Set Current Character
    dispatch(setSelectedCharacter(id));
    // Go to Edit Page
    dispatch(gotoPage(PLAY_PAGE));
  };

  return (
    <div className="landing main-page">
      <h2>Characters</h2>
      <button
        className="create-char-button"
        onClick={() => dispatch(gotoPage(CREATE_PAGE))}
        type="button"
      >
        Create New Character
      </button>
      {map(charList, (character) => (
        <div key={character.id} className="character">
          <h3>{`${character.name || "Unamed"} `}</h3>
          <div className="details">{`Level ${character.level} ${
            character.subClass || ""
          } ${character.characterClass || "Character"}`}</div>
          <div className="char-options">
            <button
              id="delete"
              onClick={() => dispatch(removeCharacter(character.id))}
              type="button"
            >
              Delete
            </button>

            <button onClick={() => handleEdit(character.id)} type="button">
              Edit
            </button>
            <button
              id="play"
              onClick={() => handlePlay(character.id)}
              type="button"
            >
              Play!
            </button>
          </div>
        </div>
      ))}
      <h3>Roll Some Dice</h3>
      <DiceRoller />
    </div>
  );
};

export default LandingPage;
