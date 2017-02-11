import { Router } from 'express'
import * as filterController from '../controllers/filter.controller'

const router = new Router()

router.route('/').get(filterController.getFilters)

export default router
