import axios from 'axios';
// import { Z_DEFAULT_COMPRESSION } from 'zlib';
import history from '../history';
import push from 'react-router-dom';

// ACTION TYPES
const GET_SINGLE_GLASSES = 'GET_SINGLE_GLASSES';
const DELETE_GLASSES = 'DELETE_GLASSES';

// ACTION CREATORS
const getSingleGlasses = singleGlasses => {
  return {
    type: GET_SINGLE_GLASSES,
    singleGlasses
  };
};

const deleteGlasses = glassesToDelete => {
  return {
    type: DELETE_GLASSES,
    glassesToDelete
  };
};
export const singleGlassesThunk = (glassesId, history) => {
  return dispatch => {
    axios
      .get(`/api/glasses/${glassesId}`)
      .then(res => res.data)
      .then(singleGlasses => {
        dispatch(getSingleGlasses(singleGlasses));
      })
      .catch(err => console.log(err));
  };
};

export const deleteGlassesThunk = glassesId => {
  return dispatch => {
    axios
      .delete(`/api/glasses/${glassesId}`)
      .then(res => res.data)
      .then(deletedGlasses => {
        dispatch(deleteGlasses(deletedGlasses));
      })
    .then(history.push(`/`).catch(err => console.log(err)));
  };
};

export default (singleGlasses = {}, action) => {
  switch (action.type) {
    case GET_SINGLE_GLASSES:
      return action.singleGlasses;
    case DELETE_GLASSES:
      return action.glassesToDelete;
    default:
      return singleGlasses;
  }
};
