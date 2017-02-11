import mongoose from 'mongoose'
const Schema = mongoose.Schema

const FilterSchema = new Schema({
  filter: { type: String, required: true }
})

export default mongoose.model('Filter', FilterSchema)
