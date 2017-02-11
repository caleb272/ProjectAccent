import callApi from '../../util/apiCaller'

export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'
export const SET_SORTING_METHOD = 'SET_SORTING_METHOD'

export const sortingMethodFunctions = {
  'Date: Newest To Oldest': (a, b) => (new Date(a.timestamp) < new Date(b.timestamp)),
  'Date: Oldest To Newest': (a, b) => (a < b),
  'Most Commented On': ({ children }, { lastChildren }) => ((children || []).length < (lastChildren || []).length),
  'Least Commented On': ({ children }, { lastChildren }) => ((children || []).length > (lastChildren || []).length)
}

export const sortingMethods = Object.keys(sortingMethodFunctions)

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


export function requestSetSortingMethod(sortingMethod) {
  return function dispatchedRequest(dispatch) {
    dispatch(setSortingMethod(sortingMethod))
    callApi('user/settings/sortingmethod', 'PUT', { sortingMethod })
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


export function setSortingMethod(sortingMethod) {
  return {
    type: SET_SORTING_METHOD,
    sortingMethod
  }
}
