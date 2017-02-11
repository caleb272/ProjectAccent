import { Router } from 'express'

import user from './user.routes'
import notification from './notification.routes'
import commentSection from './CommentSection.routes'
import filter from './filter.routes'

const router = new Router()

router.use('/user', user)
router.use('/notification', notification)
router.use('/comments', commentSection)
router.use('/filters', filter)

export default router
