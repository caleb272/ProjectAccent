import { SETCOMMENTS, ADDCOMMENT } from './CommentSectionActions'

const initialState = {
  comments: [],
  filters: []
}

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SETCOMMENTS:
      return {
        ...state,
        comments: parseComments([...action.comments], action.userBasedSortAndFilter)
      }
    case ADDCOMMENT:
      return {
        ...state,
        comments: parseComments([...state.comments, action.comment], action.userBasedSortAndFilter)
      }
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
  if (!parent.hasOwnProperty('children'))
    parent.children = []
  parent.children.push(child)
}


export function getComments(state) {
  return state.comments.comments
}


export function getFilters(state) {
  return state.comments.filters
}

export default CommentSectionReducer
