import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES'


/**
 * INITIAL STATE
 */
const initialState = {
    allGlasses: []
}

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({type: GET_GLASSES, payload: glasses })

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

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_GLASSES:
      return action.payload 
    default:
      return state
  }
}
