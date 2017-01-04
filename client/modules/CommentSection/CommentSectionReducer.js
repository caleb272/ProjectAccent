// Import Actions
import { SETCOMMENTS } from './CommentSectionActions';

// Initial State
const initialState = []

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOMMENTS:
      return action.comments || []
    default:
      return state;
  }
}


export function getComments(state) {
  return state.comments
}


export default CommentSectionReducer;
