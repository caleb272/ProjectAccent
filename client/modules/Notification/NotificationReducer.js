// Import Actions
import { SET_NOTIFICATIONS, DELETE_NOTIFICATION } from './NotificationActions'

// Initial State
const initialState = []

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications
    default:
      return state
  }
}


export function getNotifications(state) {
  return state.notifications
}

export default NotificationReducer
