import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'
import Room from '../models/roomModel.js'
import moment from 'moment'

// @desc    Create new booking
// @route   POST /api/booking
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const { room, fromDate, toDate, totalAmount, totalDays } = req.body

  const convertFrom = moment(fromDate).format('YYYY-MM-DD')
  const convertTo = moment(toDate).format('YYYY-MM-DD')

  const booking = new Booking({
    room,
    user: req.user._id,
    fromDate: convertFrom,
    toDate: convertTo,
    totalAmount,
    totalDays,
  })

  const createdBooking = await booking.save()

  const roomTemp = await Room.findById(room)

  roomTemp.currentBookings.push({
    booking: createdBooking._id,
    fromDate: convertFrom,
    toDate: convertTo,
    user: createdBooking.user,
    status: createdBooking.status,
  })

  await roomTemp.save()

  res.status(201).json(createdBooking)
})

export { createBooking }
