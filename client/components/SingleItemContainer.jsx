import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleGlassesThunk, deleteGlassesThunk, addItemToCartThunk, submitReviewThunk } from '../store';
import {SingleItemView} from './';

class SingleItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.loadSingleGlasses();
  }

  render() {
    return (
      <SingleItemView
        singleGlasses={this.props.singleGlasses}
        isAdmin={this.props.isAdmin}
        addItemToCart={this.props.addItemToCart}
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

  //this.props.match.params.id
  const path = ownProps.location.pathname
  // will be broken for 2 digit num!!!! just a temp fix
  const glassesId = path.split('/')[2];

  return {

    loadSingleGlasses: () => {
      dispatch(singleGlassesThunk(glassesId, ownProps.history));
    },
    addItemToCart: (item) => {
      item.quantity = 1;
      dispatch(addItemToCartThunk(item))
    },
    deleteGlasses: () => {
      dispatch(deleteGlassesThunk(glassesId))
    }
    // submitReview: (ev) => {
    //   const body = ev.target.body.value
    //   const rating = ev.target.rating.value
    //   console.log(body, rating)
    //   dispatch(submitReviewThunk(body, rating))
    // }
  }
};

// very weird, that we don't have id from ownProps.match...
// probably routing stuff
// feel like will look at history file later.

export default connect(
  mapState,
  mapDispatch
)(SingleItemContainer);
