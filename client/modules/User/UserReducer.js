import { SET_USER, LOGOUT, SET_SORTING_METHOD, sortingMethods, sortingMethodFunctions } from './UserActions'

const initialState = null

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user || state
    case LOGOUT:
      return null
    case SET_SORTING_METHOD:
      return { ...state, sortingMethod: action.sortingMethod }
    default:
      return state
  }
}


export function getCurrentSortingMethod({ user }) {
  return user ? user.sortingMethod : sortingMethods[0]
}


export function createUserBasedSortAndFilter(user) {
  const userSortingMethod = user ? user.sortingMethod : sortingMethods[0]
  const sortingMethodFunc = sortingMethodFunctions[userSortingMethod]

  return function userBasedSortAndFilter(comments) {
    switch (userSortingMethod) {
      case sortingMethods[2]:
      case sortingMethods[3]:
        return comments.sort(sortingMethodFunc)
      default:
        return sortByDate(comments, sortingMethodFunc)
    }
  }
}


export function sortByDate(comments, sortingMethodFunc) {
  return comments.sort((comment, lastComment) => {
    if (comment.hasOwnProperty('children'))
      comment.children = comment.children.sort(sortingMethodFunc)
    return sortingMethodFunc(comment, lastComment)
  })
}

export default UserReducer
