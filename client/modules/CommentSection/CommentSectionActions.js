import callApi from '../../util/apiCaller'

export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_COMMENTS = 'SET_COMMENTS'
export const SET_FILTERS = 'SET_FILTERS'

export function getCommentsRequest(websiteURL, userBasedSortAndFilter) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'PUT', { websiteURL })
      .then(response => dispatch(setComments(response.data, userBasedSortAndFilter)))
      .catch(console.error)
  }
}


export function getFiltersRequest() {
  return function dispatchedRequest(dispatch) {
    return callApi('filters')
      .then(response => dispatch(setFilters(response.data)))
      .catch(console.error)
  }
}


export function commentOnURLRequest(comment, websiteURL, parentID, userBasedSortAndFilter) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'POST', { comment, websiteURL, parentID })
      .then(result => dispatch(addComment(result.data, userBasedSortAndFilter)))
      .catch(console.error)
  }
}


export function addComment(comment, userBasedSortAndFilter) {
  return {
    type: ADD_COMMENT,
    comment,
    userBasedSortAndFilter
  }
}


export function setComments(comments, userBasedSortAndFilter) {
  return {
    type: SET_COMMENTS,
    comments,
    userBasedSortAndFilter
  }
}


export function setFilters(filters) {
  return {
    type: SET_FILTERS,
    filters
  }
}
