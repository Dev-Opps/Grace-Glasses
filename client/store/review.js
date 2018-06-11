import axios from 'axios';
// import history from '../history';
// import push from 'react-router-dom';

// ACTION TYPES
const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

// ACTION CREATORS
const submitReview = reviewToSubmit => {
  return {
    type: SUBMIT_REVIEW,
    reviewToSubmit
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

// REDUCER
export default (reviews = [], action) => {
  switch (action.type) {
    case SUBMIT_REVIEW:
      return [...reviews, action.reviewToSubmit];
    default:
      return reviews;
  }
};
