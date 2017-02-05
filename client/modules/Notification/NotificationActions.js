import callApi from '../../util/apiCaller'

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

export function requestGetNotifications() {
  return function dispatchedRequest(dispatch) {
    return callApi('notification')
      .then(notifications => dispatch(setReplies(notifications)))
  }
}


export function setReplies(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications
  }
}
