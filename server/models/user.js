import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  userID: String,
  twitterID: String,
  username: String,
  profileImage: String,
  provider: String
})

export default mongoose.model('User', userSchema)
