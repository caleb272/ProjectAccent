// Import Actions
import { SETCOMMENTS, ADDCOMMENT } from './CommentSectionActions';

// Initial State
const initialState = []

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOMMENTS:
      return action.comments || []
    case ADDCOMMENT:
      return [action.comment, ...state]
    default:
      return state;
  }
}


export function getComments(state) {
  return state.comments
}


export default CommentSectionReducer;
