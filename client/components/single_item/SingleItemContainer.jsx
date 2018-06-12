import React, { Component } from 'react';
import { connect } from 'react-redux';
import { singleGlassesThunk, deleteGlassesThunk, addItemToCartThunk, submitReviewThunk, deleteReviewThunk } from '../../store';
import {SingleItemView} from '../';

class SingleItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      rating: ""
    }
  }

  componentDidMount() {
    this.props.loadSingleGlasses();
  }

  render() {
    return (
      <SingleItemView
        singleGlasses={this.props.singleGlasses}
        user={this.props.user}
        reviews={this.props.reviews}
        addItemToCart={this.props.addItemToCart}
        deleteGlasses={this.props.deleteGlasses}
        deleteReview={this.props.deleteReview}
        editReview={this.props.editReview}
      />
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    singleGlasses: state.singleGlasses,
    reviews: state.singleGlasses.reviews
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const glassesId = ownProps.match.params.id
  return {
    loadSingleGlasses: () => {
      dispatch(singleGlassesThunk(glassesId, ownProps.history));
    },
    addItemToCart: (item, user) => {
      item.quantity = 1;
      dispatch(addItemToCartThunk(item, user))
    },
    deleteGlasses: () => {
      dispatch(deleteGlassesThunk(glassesId))
    },
    deleteReview: (reviewId) => {
      dispatch(deleteReviewThunk(reviewId))
    },
    editReview: (review) => {
      dispatch(deleteReviewThunk(review))
    },
    handleChange: (ev) => {
      this.setState({[ev.target.name]: ev.target.value})
    }
  }
};

export default connect(
  mapState,
  mapDispatch
)(SingleItemContainer);
