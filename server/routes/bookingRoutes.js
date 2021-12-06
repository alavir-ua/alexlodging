import express from 'express'

const router = express.Router()
import {
  createBooking,
  getBookingById,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
  deleteBooking,
  getChartData,
} from '../controllers/bookingController.js'
import { protect, admin, owner } from '../middleware/authMiddleware.js'

router.route('/').post(protect, createBooking).get(protect, admin, getBookings)
router.route('/mybookings').get(protect, getMyBookings)
router.route('/chart').get(protect, admin, getChartData)
router
  .route('/:id')
  .get(protect, owner, getBookingById)
  .delete(protect, admin, deleteBooking)
router.route('/:id/pay').put(protect, updateBookingToPaid)

export default router
