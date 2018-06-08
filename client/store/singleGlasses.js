import axios from 'axios';
// import history from '../history'

// ACTION TYPES
const GET_SINGLE_GLASSES = 'GET_SINGLE_GLASSES';

// ACTION CREATORS
const getSingleGlasses = singleGlasses => {
  return {
    type: GET_SINGLE_GLASSES,
    singleGlasses
  };
};

export const singleGlassesThunk = (glassesId, history) => {
  return dispatch => {
    axios
      .get(`/api/glasses/${glassesId}`)
      .then(res => res.data)
      .then(singleGlasses => {
        dispatch(getSingleGlasses(singleGlasses));
        // will probably still need it later?..
        // history.push(glassesId)
        // console.log('HISTORY in thunk: ', history)
      })
      .catch(err => console.log(err));
  };
};

export default (singleGlasses = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_GLASSES:
      return action.singleGlasses;
    default:
      return singleGlasses;
  }
};
