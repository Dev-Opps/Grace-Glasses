import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_GLASSES = 'GET_GLASSES'
const CREATE_UPDATE_GLASSES = 'CREATE_UPDATE_GLASSES'
/**
 * INITIAL STATE
 */

/**
 * ACTION CREATORS
 */
const getGlasses = glasses => ({type: GET_GLASSES, payload: glasses })
// const createUpdateGlasses = editedGlasses = ({type: CREATE_UPDATE_GLASSES, payload: editedGlasses})
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

export const createUpdateGlassesThunk = (editedGlasses) => {
    return function(dispatch) {
      axios
      .post('/api/glasses', editedGlasses)
      .then(res => res.data)
      .then(glasses => console.log(glasses))
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
