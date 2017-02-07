import NotificationSchema from '../models/Notification'
import UserSchema from '../models/user'
import CommentSectionSchema from '../models/comment-section'
import cuid from 'cuid'
import { respondWithData, respondWithError, respondWithForbidden, respondWithAccepted } from '../util/responses'

const debugUser = {
  userID: '123456789',
  twitterID: 'debug',
  username: 'DebugUser',
  profileImage: null,
  provider: 'debug'
}

export function getNotifications(req, res) {
  // uncomment this once your done with the test user
  // if (!req.user)
  //   respondWithForbbiden(res)

  const { userID } = req.user || debugUser
  getNotificationsForUser(userID)
    .then(notifications => respondWithData(notifications, res))
    .catch(err => respondWithError(err, res))
}


export function deleteNotification(req, res) {
  NotificationSchema.findOneAndRemove({ commentID: req.body.commentID })
    .then(() => respondWithAccepted(res))
}


export function createNotification(userID, commenterID, commentID, commentSectionURL) {
  return new NotificationSchema({
    userID,
    commenterID,
    commentSectionURL,
    commentID,
    cuid: cuid()
  }).save()
    .catch(console.error)
}


function getNotificationsForUser(userID) {
  return NotificationSchema.find({ userID })
    .then(notifications => Promise.all(notifications.map(parseNotificationToken)))
}


function parseNotificationToken({ commenterID, commentSectionURL, commentID, timestamp }) {
  return Promise.all([
    UserSchema.findOne({ userID: commenterID }),
    CommentSectionSchema.findOne({ websiteURL: commentSectionURL })
  ])
  .then(([{ username: commenter }, { comments }]) => {
    const commentData = (comments.find(c => c.cuid === commentID))
    const parentComment = (comments.find(c => c.cuid === commentData.parentID)).comment

    return {
      commenter,
      comment: commentData.comment,
      parentComment,
      commentID,
      commentSectionURL,
      timestamp
    }
  })
}
