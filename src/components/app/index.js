import React from "react";
import { Provider } from "react-redux";
import "./styles.css";
import CharacterCreatePage from '../characterCreatePage/index';
import { store } from './store.js';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <h1>Big ol text</h1>
        <CharacterCreatePage />
      </div>
    </Provider>
  );
}

export default App;
