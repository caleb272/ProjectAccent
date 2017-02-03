import CommentSection from '../models/comment-section'
import url from 'url'
import cuid from 'cuid'

export function getComments(req, res) {
  const rawURL = req.body.websiteURL
  if (!rawURL)
    return respondWithError('no websiteURL sent to server', res)

  findOrCreateCommentSectionForURL(parseURL(rawURL))
    .then(result => respondWithData(result.comments, res))
    .catch(error => respondWithError(error, res))
}


export function commentOnURL(req, res) {
  if (!req.user)
    return respondWithForddiden(res)

  const rawURL = req.body.websiteURL
  const comment = req.body.comment
  const parentID = req.body.parentID
  if (!comment || !rawURL)
    return respondWithError(' no websiteURL or comment sent to server')

  findOrCreateCommentSectionForURL(parseURL(rawURL))
    .then(commentedURL => {
      console.log(commentedURL)
      console.log(createComment(comment, parentID, req.user))
      const commentData = createComment(comment, parentID, req.user)
      commentedURL.comments.push(commentData)
      commentedURL.save()
      // success ? respondWithAccepted(res) : respondWithForddiden(res)
      return respondWithData(commentData, res)
    })
    .catch(error => respondWithError(error, res))
}


function parseURL(rawURL) {
  const parsedURL = url.parse(rawURL)
  console.log(`${parsedURL.hostname}${parsedURL.path}`)
  return `${parsedURL.hostname}${parsedURL.path}`
}


function findOrCreateCommentSectionForURL(url) {
  return findCommentSectionForURL(url)
    .then(result => (result || createCommentSectionForURL(url)))
}


function findCommentSectionForURL(websiteURL) {
  return CommentSection.findOne({ websiteURL })
}


function createCommentSectionForURL(websiteURL) {
  console.log('creating a comment section for websiteURL: ', websiteURL)
  const commentSectionSetup = {
    websiteURL,
    cuid: cuid()
  }
  const commentSection = new CommentSection(commentSectionSetup)
  return commentSection.save()
}


function createComment(comment, parentID, { userID, username }) {
  console.log('parentID from createComment:', parentID)
  return {
    comment,
    username,
    timestamp: Date.now(),
    userID,
    parentID,
    cuid: cuid()
  }
}


function respondWithError(error, res) {
  res.json({ data: null, error: error.message })
}


function respondWithData(data, res) {
  res.json({ data, error: null })
}


function respondWithAccepted(res) {
  res.status(202).end()
}


function respondWithForddiden(res) {
  res.status(403).end()
}
