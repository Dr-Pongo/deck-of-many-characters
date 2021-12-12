import React, { Component } from "react";
import { connect } from 'react-redux';
import "./styles.scss";
import { gotoPage, HOME_PAGE } from '../../containers/pageSlice';

class CharacterEditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page">
        <h2>Character Edit Page</h2>
        <h3>Please excuse the dust. This is a work in progress</h3>
        <button onClick={() => this.props.updateCurrentPage(HOME_PAGE)} type="button">Return Home</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCurrentPage: (destinationPage) => dispatch(gotoPage(destinationPage)),
  };
};

export default connect(null, mapDispatchToProps)(CharacterEditPage);
