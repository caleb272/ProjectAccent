import { SET_USER, LOGOUT } from './UserActions'

const initialState = null

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    case LOGOUT:
      return null
    default:
      return state
  }
}

export default UserReducer
