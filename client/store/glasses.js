import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES'
const GRAB_SEARCHED_GLASSES = 'GRAB_SEARCHED_GLASSES'
// const CREATE_UPDATE_GLASSES = 'CREATE_UPDATE_GLASSES'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({type: GET_GLASSES, payload: glasses })
const grabSearchedGlasses = glasses => ({type: GRAB_SEARCHED_GLASSES, payload: glasses })
// const createUpdateGlasses = editedGlasses => ({type: CREATE_UPDATE_GLASSES, payload: editedGlasses})
/**
 * THUNK CREATORS
 */
export const allGlassesThunk = () => {
  return function(dispatch) {
    axios
    .get("/api/glasses")
    .then(res => res.data)
    .then(glasses => dispatch(getGlasses(glasses)))
    .catch(err => console.log(err));
  }
}

export const grabSearchedGlassesThunk = (input) => {
  return function(dispatch) {
    axios
    .get("/api/glasses")
    .then(res => res.data)
    .then(glasses => {
      let filtered = glasses.filter(item => item.title.includes(input))
      dispatch(grabSearchedGlasses(filtered))
    })
    .catch(err => console.log(err));
  }
}
/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_GLASSES:
      return action.payload
    case GRAB_SEARCHED_GLASSES:
      return action.payload
    default:
      return state
  }
}
