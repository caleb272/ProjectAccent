import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  userID: String,
  twitterID: String,
  googleID: String,
  facebookID: String,
  username: String,
  profileImage: String,
  provider: String,
  sortingMethod: String,
  filters: Array
})

export default mongoose.model('User', userSchema)
