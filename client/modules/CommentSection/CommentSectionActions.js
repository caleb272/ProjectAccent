import callApi from '../../util/apiCaller'

export const SETCOMMENTS = 'SETCOMMENTS'
export const ADDCOMMENT = 'ADDCOMMENT'

export function getCommentsRequest(websiteURL) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'PUT', { websiteURL })
      .then(response => dispatch(setComments(response.data)))
      .catch(console.error)
  }
}


export function commentOnURLRequest(comment, websiteURL, parentID) {
  return function dispatchedRequest(dispatch) {
    return callApi('comments', 'POST', { comment, websiteURL, parentID })
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
