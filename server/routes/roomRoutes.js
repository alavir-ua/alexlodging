import express from 'express'
const router = express.Router()
import {
  getRooms,
  getRoomById,
  //deleteQuiz,
  //deleteQuizzesOfAuthor,
  //createQuiz,
  //updateQuiz,
} from '../controllers/roomController.js'
//import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(getRooms)
//.post(protect, admin, createQuiz)
router.route('/:id').get(getRoomById)
//.delete(protect, admin, deleteQuiz)
//.put(protect, admin, updateQuiz)

export default router
