import { Router } from 'express'
import * as CommentSectionController from '../controllers/CommentSection.controller'

const router = new Router()

router.route('/').put(CommentSectionController.getComments)
router.route('/').post(CommentSectionController.commentOnURL)

export default router
