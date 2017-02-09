import User from '../models/user'
import { respondWithData, respondWithAccepted } from '../util/responses'

export function getUser(req, res) {
  respondWithData(req.user, res)
}


export function logout(req, res) {
  req.logout()
  respondWithAccepted(res)
}
