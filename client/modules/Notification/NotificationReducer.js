// Import Actions
import { SET_NOTIFICATIONS, DELETE_NOTIFICATION } from './NotificationActions'

// Initial State
const initialState = []

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATIONS:
      return action.notifications
    case DELETE_NOTIFICATION:
      return state.filter(n => n.commentID !== action.commentID)
    default:
      return state
  }
}


export function getNotifications(state) {
  return state.notifications
}

export default NotificationReducer
