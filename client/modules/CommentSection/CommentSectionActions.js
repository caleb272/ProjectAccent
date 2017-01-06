import callApi from '../../util/apiCaller'
// Export Constants
export const SETCOMMENTS = 'SETCOMMENTS'
export const ADDCOMMENT = 'ADDCOMMENT'

// Export Actions
export function getCommentsRequest(websiteURL) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'PUT', { websiteURL })
      .then(response => dispatch(setComments(response.data)))
      .catch(console.error)
  }
}


export function commentOnURLRequest(comment, websiteURL) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'POST', { comment, websiteURL })
      .then(result => {
        console.log('your result: ', result.data)
        dispatch(addComment(result.data))
      })
  }
}


export function addComment(comment) {
  return {
    type: ADDCOMMENT,
    comment
  }
}


export function setComments(comments) {
  return {
    type: SETCOMMENTS,
    comments
  }
}
