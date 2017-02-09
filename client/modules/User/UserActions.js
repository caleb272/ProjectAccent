import callApi from '../../util/apiCaller'

export const SET_USER = 'SET_USER'

export function requestGetUser() {
  return function dispatchedRequest(dispatch) {
    return callApi('user')
      .then(response => dispatch(setUser(response.data)))
  }
}


export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}
