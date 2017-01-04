import { Router } from 'express'
import * as CommentSectionController from '../controllers/CommentSection.controller'

const router = new Router()

router.route('/').put(CommentSectionController.getComments)


export default router
