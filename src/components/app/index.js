import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import "./styles.css";
import CharacterCreatePage from '../characterCreatePage/index';
import { store } from './store.js';
import { selectPage, gotoPage, HOME_PAGE, CREATE_PAGE } from '../../containers/pageSlice'

function App() {
  const currentPage = useSelector(selectPage);
  const dispatch = useDispatch();

  return (
    <Provider store={store} >
      <div className="App">
        <h1>Deck of Many Characters</h1>
        {currentPage === HOME_PAGE   && <button type="button" onClick={() => dispatch(gotoPage(CREATE_PAGE))}>Character Create Page</button>}
        {currentPage === CREATE_PAGE && <CharacterCreatePage />}
      </div>
    </Provider>
  );
}

export default App;
