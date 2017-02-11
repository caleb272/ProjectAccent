import { SET_COMMENTS, ADD_COMMENT, SET_FILTERS } from './CommentSectionActions'

const initialState = {
  comments: [],
  filters: []
}

const CommentSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return {
        ...state,
        comments: parseComments([...action.comments], action.userBasedSortAndFilter)
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: parseComments([...state.comments, action.comment], action.userBasedSortAndFilter)
      }
    case SET_FILTERS:
      return {
        ...state,
        filters: action.filters
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
