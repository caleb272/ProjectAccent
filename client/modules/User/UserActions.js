import callApi from '../../util/apiCaller'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

export function requestGetUser() {
  return function dispatchedRequest(dispatch) {
    return callApi('user')
      .then(response => dispatch(setUser(response.data)))
  }
}


export function requestLogout() {
  return function dispatchedRequest(dispatch) {
    dispatch(logout())
    return callApi('/user/logout')
  }
}


export function setUser(user) {
  return {
    type: SET_USER,
    user
  }
}


export function logout() {
  return {
    type: LOGOUT
  }
}
