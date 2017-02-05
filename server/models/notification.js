import mongoose from 'mongoose'
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
  userID: String,
  commentID: String,
  commentSectionURL: String,
  timestamp: String,
})

export default mongoose.model('Notification', NotificationSchema)
