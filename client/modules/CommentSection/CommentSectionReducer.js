// Import Actions
import { SETCOMMENTS, ADDCOMMENT } from './CommentSectionActions'

// Initial State
const initialState = []

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOMMENTS:
      return parseComments([...action.comments], action.userBasedSortAndFilter)
    case ADDCOMMENT:
      return parseComments([...state, action.comment], action.userBasedSortAndFilter)
    default:
      return state;
  }
}


function parseComments(newComments, userBasedSortAndFilter) {
  const comments = []
  for (const comment of newComments) {
    if (comment.parentID)
      addChildToParent(comment, comments)
    else
      comments.push(comment)
  }
  return userBasedSortAndFilter(comments)
}


function addChildToParent(child, comments) {
  const parent = comments.find(i => i.cuid === child.parentID)
  if (!parent)
    console.log(child)
  if (!parent.hasOwnProperty('children'))
    parent.children = []
  parent.children.push(child)
}


export function getComments(state) {
  return state.comments
}

export default CommentSectionReducer
