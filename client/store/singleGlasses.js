import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_SINGLE_GLASSES = 'GET_SINGLE_GLASSES'

// INITIAL STATE
const defaultState = {}

// ACTION CREATORS
const getSingleGlasses = singleGlasses => ({
    type: GET_SINGLE_GLASSES, 
    singleGlasses 
})

// THUNK CREATORS
// NEED TO TEST
// export const singleGlassesThunk = glassesId => {
//     dispatch => {
//         axios.get(`/api/glasses/${glassesId}`)
//         .then(res => {
//             console.log(res.data)
//             dispatch(getSingleGlasses(res.data))
//             history.push(`glasses/${glassesId}`)
//         })
//     }
// }

export default (state = defaultState, action) => {
  switch(action.type) {
    case GET_SINGLE_GLASSES:
      return action.singleGlasses
    default:
      return state
  }
}
