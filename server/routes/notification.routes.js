import { Router } from 'express'
import * as NotificationController from '../controllers/notification.controller'

const router = new Router()

router.route('/').get(NotificationController.getNotifications)
router.route('/').delete(NotificationController.deleteNotification)

export default router
