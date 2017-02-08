import CommentSection from '../models/comment-section'
import { createNotification } from './notification.controller'
import { respondWithError, respondWithForbbiden, respondWithData } from '../util/responses'
import url from 'url'
import cuid from 'cuid'

const debugUser = {
  userID: '123456789',
  twitterID: 'debug',
  username: 'DebugUser',
  profileImage: null,
  provider: 'debug'
}

export function getComments(req, res) {
  const rawURL = req.body.websiteURL
  if (!rawURL)
    return respondWithError('no websiteURL sent to server', res)

  findOrCreateCommentSectionForURL(parseURL(rawURL))
    .then(result => respondWithData(result.comments, res))
    .catch(error => respondWithError(error, res))
}


export function commentOnURL(req, res) {
  req.user = req.user || debugUser // this is temporary for debug
  if (!req.user)
    return respondWithForbbiden(res)

  const rawURL = req.body.websiteURL
  const comment = req.body.comment
  const parentID = req.body.parentID
  if (!comment || !rawURL)
    return respondWithError('no websiteURL or comment sent to server')

  findOrCreateCommentSectionForURL(parseURL(rawURL))
    .then(commentedURL => {
      const commentData = createComment(comment, parentID, req.user)
      notifyRelevantUsers(commentData, commentedURL.comments, commentedURL.websiteURL)
      commentedURL.comments.push(commentData)
      commentedURL.save()


      return respondWithData(commentData, res)
    })
    .catch(error => respondWithError(error, res))
}


function parseURL(rawURL) {
  const parsedURL = url.parse(rawURL)
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
  const commentSectionSetup = {
    websiteURL,
    cuid: cuid()
  }
  const commentSection = new CommentSection(commentSectionSetup)
  return commentSection.save()
}


function createComment(comment, parentID, { userID, username }) {
  return {
    comment,
    username,
    timestamp: Date.now(),
    userID,
    parentID,
    cuid: cuid()
  }
}


function notifyRelevantUsers(commentData, urlComments, commentSectionURL) {
  const peopleToNotify = getPeopleToNotify(commentData, urlComments)
  for (const userID of peopleToNotify)
    createNotification(userID, commentData.userID, commentData.cuid, commentSectionURL)
}


function getPeopleToNotify(commentData, urlComments) {
  const peopleToNotify = []
  if (!commentData.parentID)
    return peopleToNotify

  for (const currentCommentData of urlComments) {
    if (shouldNotify(currentCommentData, commentData.parentID, commentData.userID, peopleToNotify))
      peopleToNotify.push(currentCommentData.userID)
  }

  return peopleToNotify
}


function shouldNotify(commentData, parentID, commenterID, peopleToNotify) {
  return (commentData.parentID === parentID || commentData.cuid === parentID)
      && commentData.userID !== commenterID
      && peopleToNotify.indexOf(commentData.userID) === -1
}
