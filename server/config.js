const config = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/project-accent',
  port: process.env.PORT || 8000,
  twitterConsumerKey: process.env.TWITTER_CONSUMER_KEY,
  twitterPrivateKey: process.env.TWITTER_PRIVATE_KEY,
  twitterCallbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:8000/auth/twitter/callback'
}

export default config
