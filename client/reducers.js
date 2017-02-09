/**
 * Root Reducer
 */
import { combineReducers } from 'redux'

// Import Reducers
import app from './modules/App/AppReducer'
import posts from './modules/Post/PostReducer'
import intl from './modules/Intl/IntlReducer'
import comments from './modules/CommentSection/CommentSectionReducer'
import notifications from './modules/Notification/NotificationReducer'
import user from './modules/User/UserReducer'

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  posts,
  intl,
  comments,
  notifications,
  user
})
