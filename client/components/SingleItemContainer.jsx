import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleGlassesThunk, deleteGlassesThunk } from '../store';
import {SingleItemView} from './';

class SingleItemContainer extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.loadSingleGlasses();
  }

  render() {
    return (
      <SingleItemView
        singleGlasses={this.props.singleGlasses}
        isAdmin={this.props.isAdmin}
        deleteGlasses={this.props.deleteGlasses}
      />
    );
  }
}

const mapState = state => {
  return {
    isAdmin: state.user.isAdmin,
    singleGlasses: state.singleGlasses
  };
};
const mapDispatch = (dispatch, ownProps) => {
  // this is a state which CONTAINER component receive from AllGlasses component
  // through the Link props.
  const glassesId = ownProps.location.state;
  console.log(glassesId);
  return {
    loadSingleGlasses: () => {
      dispatch(singleGlassesThunk(glassesId, ownProps.history));
    },
    deleteGlasses: () => {
      dispatch(deleteGlassesThunk(glassesId))
    }
    
  };
};

// very weird, that we don't have id from ownProps.match...
// probably routing stuff
// feel like will look at it later.

export default connect(
  mapState,
  mapDispatch
)(SingleItemContainer);
