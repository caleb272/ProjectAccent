import CommentSection from '../models/CommentSection'
import url from 'url'

export function getComments(req, res) {
  const rawURL = req.body.websiteLink
  if (rawURL)
    console.log(url.parse(rawURL))
  // get the comments on this website

  const data = []
  data.push({
    username: 'Caleb',
    message: 'sup',
    timestamp: new Date()
  })
  data.push({
    username: 'Bob',
    message: 'whats up',
    timestamp: new Date()
  })
  data.push({
    username: 'Rick',
    message: 'Great Vid',
    timestamp: new Date()
  })
  return res.json({ data })
}
