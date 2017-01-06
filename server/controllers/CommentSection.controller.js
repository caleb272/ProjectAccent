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
  const rawURL = req.body.websiteURL
  const comment = req.body.comment
  if (!comment || !rawURL)
    return respondWithError(' no websiteURL or comment send to server')

  findOrCreateCommentSectionForURL(parseURL(rawURL))
    .then(commentedURL => {
      console.log(commentedURL)
      console.log(createComment(comment, 'Caleb Martin'))
      const commentData = createComment(comment, 'Caleb Martin')
      commentedURL.comments.push(commentData)
      commentedURL.save()
      // success ? respondWithAccepted(res) : respondWithForddiden(res)
      return respondWithData(commentData, res)
    })
    .catch(error => respondWithError(error, res))
}


function parseURL(rawURL) {
  const parsedURL = url.parse(rawURL)
  return `${parsedURL.host}${parsedURL.path}`
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


function createComment(comment, username) {
  return {
    comment,
    username,
    timestamp: Date.now(),
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
