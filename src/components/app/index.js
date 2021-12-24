import React from "react";
import { Provider, useSelector } from "react-redux";
import "./styles.scss";
import CharacterCreatePage from "../characterCreatePage/index";
import LandingPage from "../landingPage/index";
import GameplayPage from "../gameplayPage/index";
import CharacterEditPage from "../characterEditPage/index";
import { store } from "./store.js";
import {
  selectPage,
  HOME_PAGE,
  CREATE_PAGE,
  EDIT_PAGE,
  PLAY_PAGE,
} from "../../containers/pageSlice";
// import { selectCharacters } from '../../containers/charactersSlice';
export const WIP_COMPONENT = false;

function App() {
  const currentPage = useSelector(selectPage);

  // useEffect(()=> {
  //   localStorage.setItem('savedCharacters', JSON.stringify(selectCharacters));
  // }, [selectCharacters]);

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Deck of Many Characters</h1>
        {currentPage === HOME_PAGE && <LandingPage />}
        {currentPage === CREATE_PAGE && <CharacterCreatePage />}
        {currentPage === EDIT_PAGE && WIP_COMPONENT && <CharacterEditPage />}
        {currentPage === PLAY_PAGE && <GameplayPage />}
      </div>
    </Provider>
  );
}

export default App;
