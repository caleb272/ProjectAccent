import callApi from '../../util/apiCaller'

export const SETCOMMENTS = 'SETCOMMENTS'
export const ADDCOMMENT = 'ADDCOMMENT'

export function getCommentsRequest(websiteURL, userBasedSortAndFilter) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'PUT', { websiteURL })
      .then(response => dispatch(setComments(response.data, userBasedSortAndFilter)))
      .catch(console.error)
  }
}


export function getFiltersRequest() {
  return function dispatchedRequest(dispatch) {
    callApi('filters')
      .then(response => console.log('getFiltersRequest: ', response))
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
    type: ADDCOMMENT,
    comment,
    userBasedSortAndFilter
  }
}


export function setComments(comments, userBasedSortAndFilter) {
  return {
    type: SETCOMMENTS,
    comments,
    userBasedSortAndFilter
  }
}
