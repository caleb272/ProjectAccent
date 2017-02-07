import callApi from '../../util/apiCaller'

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

export function requestGetNotifications() {
  return function dispatchedRequest(dispatch) {
    return callApi('notification')
      .then(response => dispatch(setNotifications(response.data)))
      .catch(console.error)
  }
}


export function requestDeleteNotification(commentID) {
  return function dispatchedRequest(dispatch) {
    return dispatch(deleteNotification(commentID))
  }
}


export function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications
  }
}


export function deleteNotification(commentID) {
  return {
    type: DELETE_NOTIFICATION,
    commentID
  }
}
