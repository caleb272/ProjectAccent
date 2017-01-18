import { Router } from 'express'
import * as AuthController from '../controllers/auth.controller'
// passport imports
import passport from 'passport'
import TwitterStrategy from 'passport-twitter'
import serverConfig from '../config'

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
    done(null, profile)
  }
))

router.use(passport.initialize())
router.use(passport.session())

router.use('/auth', authCallbackRouter)

authCallbackRouter.route('/twitter/login').get(passport.authenticate('twitter'))
authCallbackRouter.route('/twitter/callback').get(passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }))

export default router
