import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.scss";
import { selectCharacters, removeCharacter } from '../../containers/charactersSlice';
import { gotoPage, CREATE_PAGE, EDIT_PAGE, PLAY_PAGE } from '../../containers/pageSlice';

const LandingPage = () => {
    const dispatch = useDispatch();
    const charList = useSelector(selectCharacters);

    return (
      <div className="page">
        <h2>Characters</h2>
        <button onClick={() => dispatch(gotoPage(CREATE_PAGE))} type="button">Create New Character</button>
        {charList.map(character => 
          <div key={character.id} className="character">
            <h3>{`${character.name} Level ${character.level} ${character.subClass} ${character.class}`}</h3>
            <button onClick={() => dispatch(removeCharacter(character.id))} type="button">Delete</button>
            <button onClick={() => dispatch(gotoPage(EDIT_PAGE))} type="button">Edit</button>
            <button onClick={() => dispatch(gotoPage(PLAY_PAGE))} type="button">Play!</button>
          </div>
        )}
      </div>);
}

export default LandingPage;
