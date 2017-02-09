import { SET_USER } from './UserActions'

const initialState = null

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}

export default UserReducer
