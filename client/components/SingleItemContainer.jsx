import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleGlassesThunk } from '../store';
import SingleItemView from './SingleItemView';

class SingleProductView extends Component {
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
  return {
    loadSingleGlasses: () => {
      dispatch(singleGlassesThunk(glassesId, ownProps.history));
    }
  };
};

// very weird, that we don't have id from ownProps.match...
// probably routing stuff
// feel like will look at it later.

export default connect(
  mapState,
  mapDispatch
)(SingleProductView);
