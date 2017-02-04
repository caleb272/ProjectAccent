// Import Actions
import { SETCOMMENTS, ADDCOMMENT } from './CommentSectionActions';

// Initial State
const initialState = []

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOMMENTS:
      return parseNewComments([], action.comments)
    case ADDCOMMENT:
      return parseNewComments([...state], [action.comment])
    default:
      return state;
  }
}


function parseNewComments(comments, newComments) {
  for (const comment of newComments) {
    if (comment.parentID)
      addChildToParent(comment, comments)
    else
      comments.push(comment)
  }
  return comments
}


function addChildToParent(child, comments) {
  const parent = comments.find(i => i.cuid === child.parentID)
  if (!parent.hasOwnProperty('children'))
    parent.children = []
  parent.children.push(child)
}


export function getComments(state) {
  return state.comments
}

export default CommentSectionReducer;
