import callApi from '../../util/apiCaller'
// Export Constants
export const SETCOMMENTS = 'SETCOMMENTS'

// Export Actions
export function getCommentsRequest(websiteLink) {
  return function dispatchedRequest(dispatch) {
    // return dispatch(setComments([{ username: 'fuck', message: 'fuck' }]))
    return callApi('comments', 'PUT', { websiteLink })
      .then((response) => {
        console.log('response: ', response)
        dispatch(setComments(response.data))
      }).catch(console.error)
  }
}


export function setComments(comments) {
  return {
    type: SETCOMMENTS,
    comments
  }
}
