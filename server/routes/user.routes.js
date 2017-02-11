import { Router } from 'express'
import * as UserController from '../controllers/user.controller'

const router = new Router()

router.route('/').get(UserController.getUser)
router.route('/logout').get(UserController.logout)
router.route('/settings/sortingmethod').put(UserController.setSortingMethod)

export default router
