import axios from 'axios';
// import history from '../history';
// import push from 'react-router-dom';

// ACTION TYPES
const SUBMIT_REVIEW = 'SUBMIT_REVIEW';
const DELETE_REVIEW = 'DELETE_REVIEW';
const EDIT_REVIEW = 'EDIT_REVIEW';

// ACTION CREATORS
const submitReview = reviewToSubmit => {
  return {
    type: SUBMIT_REVIEW,
    reviewToSubmit
  };
};

const deleteReview = reviewToDelete => {
  return {
    type: DELETE_REVIEW,
    reviewToDelete
  };
};

const editReview = reviewToEdit => {
  return {
    type: EDIT_REVIEW,
    reviewToEdit
  };
};

// THUNKS

export const submitReviewThunk = (reviewToSubmit) => {
  return dispatch => {
    axios
    .post(`/api/reviews`, reviewToSubmit)
    .then(res => res.data)
    .then(postedReview => dispatch(submitReview(postedReview)))
    .catch(err => console.log(err))
  };
};

export const deleteReviewThunk = (reviewId) => {
  return dispatch => {
    axios
      .delete(`/api/reviews/${reviewId}`)
      .then(res => res.data)
      .then(deletedReview => dispatch(deleteReview(deletedReview)))
      .catch(err => console.log(err))
  };
};

export const editReviewThunk = (review) => {
  return dispatch => {
    axios
      .put(`/api/reviews/${review.id}`, review)
      .then(res => res.data)
      .then(editedReview => dispatch(editReview(editedReview)))
      .catch(err => console.log(err))
  };
};

// REDUCER
export default (reviews = [], action) => {
  switch (action.type) {
    case SUBMIT_REVIEW:
      return [...reviews, action.reviewToSubmit];
    case DELETE_REVIEW:
      return [...reviews].filter(review => {
        return review.id !== action.payload.id
      })
    case EDIT_REVIEW:
      return [...reviews, action.reviewToEdit]
    default:
      return reviews;
  }
};
