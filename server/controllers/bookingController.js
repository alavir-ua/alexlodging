import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'
import Room from '../models/roomModel.js'
import scheduler from '../agenda/scheduler.js'

// @desc    Create new booking
// @route   POST /api/booking
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  const booking = new Booking(req.body)

  const createdBooking = await booking.save()

  await scheduler.checkBookingForPayment(createdBooking._id)

  const roomTemp = await Room.findById(req.body.room)

  roomTemp.currentBookings.push({
    booking: createdBooking._id,
    fromDate: createdBooking.fromDate,
    toDate: createdBooking.toDate,
    user: createdBooking.user,
  })

  await roomTemp.save()

  res.status(201).json(createdBooking)
})
// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('user', 'name email')
    .populate('room', 'hotelName address imageUrls')

  if (booking) {
    res.json(booking)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Update booking to paid
// @route   GET /api/bookings/:id/pay
// @access  Private
const updateBookingToPaid = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    booking.isPaid = true
    booking.paidAt = Date.now()
    booking.status = 'booked'
    booking.paymentResult = {
      id: req.body.id,
      status: req.body.status.toLowerCase(),
      update_time: new Date(req.body.created),
      email_address: req.body.charges.data[0].billing_details.email,
    }
    const updatedOrder = await booking.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort({
      createdAt: -1,
    })
    .populate('room', 'hotelName address')
  res.json(bookings)
})

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
  const pageSize = Number(process.env.ADMIN_PAGE_SIZE)
  const page = Number(req.query.pageNumber) || 1

  if (keyword) {
    const data = await Booking.find({})
      .populate('user', 'id name')
      .populate('room', 'id hotelName address')
      .sort({ createdAt: -1 })

    const filterBookings = data.filter(
      (booking) =>
        booking._id.toString().includes(`${keyword}`) ||
        booking.user.name.includes(`${keyword}`) ||
        booking.room.hotelName.includes(`${keyword}`)
    )
    const bookings = filterBookings.slice(
      pageSize * page - pageSize,
      pageSize * page
    )

    res.json({
      bookings,
      page,
      pages: Math.ceil(filterBookings.length / pageSize),
      pageSize,
    })
  } else {
    const count = await Booking.countDocuments({})
    const bookings = await Booking.find({})
      .sort({ fromDate: +1 })
      .populate('user', 'id name')
      .populate('room', 'id hotelName address')
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ bookings, page, pages: Math.ceil(count / pageSize), pageSize })
  }
})

/*method for deleting a reservation within 20 minutes if it is not paid*/
const checkBookingForPayment = asyncHandler(async (id) => {
  const booking = await Booking.findById(id)

  if (booking) {
    if (!booking.isPaid) {
      const room = await Room.findById(booking.room)

      room.currentBookings = room.currentBookings.filter((element) => {
        return element.booking.toString() !== booking._id.toString()
      })

      await room.save()
      await booking.remove()
    }
  } else {
    console.log('Booking not found')
  }
})

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)

  if (booking) {
    const room = await Room.findById(booking.room)

    room.currentBookings = room.currentBookings.filter((element) => {
      return element.booking.toString() !== booking._id.toString()
    })

    await room.save()
    await booking.remove()

    res.json({ message: 'Booking removed' })
  } else {
    res.status(404)
    throw new Error('Booking not found')
  }
})

export {
  createBooking,
  getBookingById,
  updateBookingToPaid,
  getMyBookings,
  getBookings,
  checkBookingForPayment,
  deleteBooking,
}
