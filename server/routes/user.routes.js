import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = new Router()

router.route('/').get(userController.getUser)
router.route('/logout').get(userController.logout)
router.route('/settings/sortingmethod').put(userController.setSortingMethod)
router.route('/settings/filters').put(userController.setUserFilters)

export default router
