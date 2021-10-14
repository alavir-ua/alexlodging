import asyncHandler from 'express-async-handler'
import Room from '../models/roomModel.js'
import moment from 'moment'

// @desc    Fetch all rooms
// @route   GET /api/rooms/page/:pageNumber
// @access  Public
const getRooms = asyncHandler(async (req, res) => {
  const from_date = req.query.fromdate
  const to_date = req.query.todate

  const page = Number(req.query.pageNumber) || 1
  const pageSize = 5

  const keyword = req.query.keyword
    ? {
        hotelName: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  if (from_date || to_date) {
    const roomsData = await Room.find({ ...keyword })

    let tempRooms = []

    for (let room of roomsData) {
      let availability = true

      for (let booking of room.currentBookings) {
        if (room.currentBookings.length !== 0) {
          if (
            moment(booking.fromDate).isBetween(
              from_date,
              to_date,
              'day',
              '[]'
            ) ||
            moment(booking.toDate).isBetween(from_date, to_date, 'day', '[]')
          ) {
            availability = false
          }
        }
      }
      if (availability || room.currentBookings.length === 0) {
        tempRooms.push(room)
      }
    }

    const rooms = tempRooms.slice(pageSize * page - pageSize, pageSize * page)
    res.json({ rooms, page, pages: Math.ceil(tempRooms.length / pageSize) })
  } else {
    const count = await Room.countDocuments({ ...keyword })

    const rooms = await Room.find({ ...keyword })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ rooms, page, pages: Math.ceil(count / pageSize) })
  }
})

// @desc    Fetch single room
// @route   GET /api/rooms/:id
// @access  Public
const getRoomById = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)

  if (room) {
    res.json(room)
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

export {
  getRooms,
  getRoomById,
  //deleteQuiz,
  //deleteQuizzesOfAuthor,
  //createQuiz,
  //updateQuiz,
}
