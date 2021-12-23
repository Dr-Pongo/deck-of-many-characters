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
import map from "lodash/map";
import { WIP_COMPONENT } from "../app/index";

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
          <h3>{`${character.name || 'Unamed'} Level ${character.level} ${character.subClass} ${character.class}`}</h3>
          <div className="char-options">
            <button
              id="delete"
              onClick={() => dispatch(removeCharacter(character.id))}
              type="button"
            >
              Delete
            </button>
            {WIP_COMPONENT && (
              <button onClick={() => handleEdit(character.id)} type="button">
                Edit
              </button>
            )}
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
    </div>
  );
};

export default LandingPage;
