import User from '../models/user'
import { respondWithData, respondWithAccepted, respondWithForddiden, respondWithError } from '../util/responses'

export function getUser(req, res) {
  respondWithData(req.user, res)
}


export function logout(req, res) {
  req.logout()
  respondWithAccepted(res)
}


export function setSortingMethod(req, res) {
  if (!req.user || !req.body.hasOwnProperty('sortingMethod'))
    return respondWithForddiden(res)

  return User.findOneAndUpdate({ userID: req.user.userID }, { sortingMethod: req.body.sortingMethod }, { new: true })
    .then(modifiedUser => {
      modifiedUser.markModified('sortingMethod')
      modifiedUser.save()
    })
    .then(() => respondWithAccepted(res))
    .catch(err => respondWithError(err, res))
}


export function setUserFilters(req, res) {
  if (!req.user || !req.body.hasOwnProperty('filters'))
    return respondWithForddiden(res)

  return User.findOneAndUpdate({ userID: req.user.userID }, { filters: req.body.filters })
    .then(() => respondWithAccepted(res))
    .catch(err => respondWithError(err, res))
}
