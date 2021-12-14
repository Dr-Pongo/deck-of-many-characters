import React, { Component } from "react";
import { connect } from 'react-redux';
import "./styles.scss";
import map from 'lodash/map';
import { gotoPage, HOME_PAGE } from '../../containers/pageSlice';

class GameplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {name, level, subClass, abilities, skills, actions} = this.props;
    return (
      <div className="page">
        <h2>GamePlay Page</h2>
        <div className="basicInfo">
          <h3>{name}</h3>
          <label>{`Level ${level} ${subClass} ${this.props.class}`}</label>
          <div className="abilities" >
            { map(abilities, (ab, index) => {
                  return (<label key={`${ab.name}+${index}`}>{`${ab.name}: ${ab.val}`}</label>)
              })}
          </div>
        </div>
        <div className="additionalInfo"> 
          <div className="skills" >
            <h3>Skills: </h3>
            { map(skills, (skill, index) => {
                return (
                  <div className="skillEditor" key={`${skill.name}-${skill.ability}`}>
                      <label>{skill.name}</label>
                  </div>
                );
              }) }
          </div>
          <div className="saves" >
            <h3>Saving Throws: </h3>
            { map(abilities, (ab, index) => {
                  return (
                   <div className="save" key={ab.id} >
                     <h4>{ab.name}</h4>
                   </div> 
                  )
              }) }
          </div>
          <div className="actions" >
            <h3>Actions!</h3>
            { actions.map((action, index) => {
                return (
                  <div key={action.id} className="action" >
                    <label>{`${action.name}`}</label>
                    <button type="button">Attempt</button>
                    <button type="button">Result</button>
                  </div>
                );
             }) }
          </div>
        </div>
        <button onClick={() => this.props.updateCurrentPage(HOME_PAGE)} type="button">Return Home</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { characters, selectedCharacter } = state;
  return characters[selectedCharacter];
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameplayPage);
