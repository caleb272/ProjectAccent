import User from '../models/user'
import { respondWithData } from '../util/responses'

export function getUser(req, res) {
  respondWithData(req.user, res)
}
