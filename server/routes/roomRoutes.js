import express from 'express'

const router = express.Router()
import {
  getRooms,
  getRoomsForAdmin,
  getRoomById,
  createRoom,
  deleteRoom,
  // updateRoom,
} from '../controllers/roomController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(getRooms)
router.route('/create').post(protect, admin, createRoom)
router.route('/admin').get(protect, admin, getRoomsForAdmin)
router.route('/:id').get(getRoomById).delete(protect, admin, deleteRoom)
//.put(protect, admin, updateRoom)

export default router
