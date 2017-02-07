export function respondWithError(error, res) {
  res.json({ data: null, error: error.message })
}


export function respondWithData(data, res) {
  res.json({ data, error: null })
}


export function respondWithAccepted(res) {
  res.status(202).end()
}


export function respondWithForddiden(res) {
  res.status(403).end()
}
