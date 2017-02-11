import Filter from '../models/filter'
import { respondWithData, respondWithError } from '../util/responses'

export function getFilters(req, res) {
  Filter.find()
    .then(filters => filters.map(cf => cf.filter))
    .then(filters => respondWithData(filters, res))
    .catch(err => respondWithError(err, res))
}
