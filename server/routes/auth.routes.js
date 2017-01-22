import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'
// passport imports
import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import serverConfig from '../config'
import User from '../models/user'
import cuID from 'cuID'

const router = new Router()
const authCallbackRouter = new Router()


passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((id, done) => done(null, id))

passport.use(new TwitterStrategy(
  {
    consumerKey: serverConfig.twitterConsumerKey,
    consumerSecret: serverConfig.twitterPrivateKey,
    callbackURL: serverConfig.twitterCallbackURL
  },
  (token, tokenSecret, profile, done) => {
    return findOrCreateUser(profile)
      .then(user => done(null, user))
      .catch(err => done(err, null))
  }
))


function findOrCreateUser(profile) {
  return findUser(profile)
    .then(user => user || createUser(profile))
}


function findUser({ ID: twitterID }) {
  return User.findOne({ twitterID })
}


function createUser({ ID: twitterID, displayName: username, photos, provIDer }) {
  const userID = cuID()
  const profileImage = photos[0].value
  return new User({ userID, twitterID, username, profileImage, provIDer }).save()
}

router.use(passport.initialize())
router.use(passport.session())

router.use('/auth', authCallbackRouter)

authCallbackRouter.route('/twitter/login').get(passport.authenticate('twitter'))
authCallbackRouter.route('/twitter/callback').get(passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }))

export default router
