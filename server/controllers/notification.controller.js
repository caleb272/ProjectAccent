import Notification from '../models/notification'
import cuid from 'cuid'

// test data
const test = [
  {
    commenter: 'testAccount',
    comment: 'get this to work',
    parentComment: 'first!!!',
    commentID: '20ao049aehou',
    commentSectionURL: 'test.com/'
  },
  {
    commenter: 'myTest',
    comment: 'another comment',
    parentComment: 'yolo',
    commentID: '20ao042341th',
    commentSectionURL: 'test.com/anotherurl'
  }
]

export function getNotifications(req, res) {
  res.send({ data: test })
}


export function deleteNotification(req, res) { res.end() }

export function createNotification(userID, commenterID, commentID, commentSectionURL) {
  return new Notification({
    userID,
    commenterID,
    commentSectionURL,
    commentID,
    cuid: cuid()
  }).save()
}
