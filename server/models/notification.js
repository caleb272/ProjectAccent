import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  userID: String,
  commenterID: String,
  commentID: String,
  commentSectionURL: String,
  timestamp: { type: Date, default: Date.now() },
  cuid: String
})

export default mongoose.model('Notification', NotificationSchema)
