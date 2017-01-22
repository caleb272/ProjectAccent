import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSectionSchema = new Schema({
  websiteURL: { type: String, required: true },
  comments: { type: Array, defualt: [] },
  timestamp: { type: Date, default: Date.now },
  cuid: { type: String, required: true }
})

// a comment looks like this
/*
{
  comment: String,
  username: String,
  timestamp: String,
  cuid: String,
  userID: String
}
*/

export default mongoose.model('CommentSection', CommentSectionSchema)
