import callApi from '../../util/apiCaller'

export const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

const test = [
  {
    commenter: 'testAccount',
    comment: 'get this to work',
    yourComment: 'first!!!',
    commentID: '20ao049aehou',
    commentSectionURL: 'test.com/'
  },
  {
    commenter: 'myTest',
    comment: 'another comment',
    yourComment: 'yolo',
    commentID: '20ao042341th',
    commentSectionURL: 'test.com/anotherurl'
  }
]

export function requestGetNotifications() {
  return function dispatchedRequest(dispatch) {
    // return callApi('notification')
    //   .then(notifications => dispatch(setNotifications(notifications)))
    return dispatch(setNotifications(test))
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
