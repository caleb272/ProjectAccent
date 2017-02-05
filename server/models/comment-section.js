import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSectionSchema = new Schema({
  websiteURL: { type: String, required: true },
  comments: { type: Array, default: [] },
  timestamp: { type: Date, default: Date.now },
  cuid: { type: String, required: true }
})

// a comment looks like this
/*
{
  comment: String,
  username: String,
  timestamp: String,
  userID: String,
  parentID: String,
  cuid: String
}
*/

export default mongoose.model('CommentSection', CommentSectionSchema)
