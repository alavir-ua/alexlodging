import asyncHandler from 'express-async-handler'
import Booking from '../models/bookingModel.js'
import Room from '../models/roomModel.js'
import moment from 'moment'

// @desc    Fetch all rooms (with filters)
// @route   GET /api/admin/rooms/page/:pageNumber/search/:keyword
// @access  Private/Admin
const getRooms = asyncHandler(async (req, res) => {
  const { accomodType, comfortType, maxCost } = req.body

  const from_date = req.query.fromdate
  const to_date = req.query.todate

  const page = Number(req.query.pageNumber) || 1
  const pageSize = Number(process.env.USER_PAGE_SIZE)

  const filter = {
    rentPerDay: { $lte: maxCost },
    accommodationType:
      accomodType === ''
        ? {
            $regex: /[A-Za-z]/,
            $options: 'i',
          }
        : accomodType,
    comfortType:
      comfortType === ''
        ? {
            $regex: /[A-Za-z]/,
            $options: 'i',
          }
        : comfortType,
    hotelName:
      req.query.keyword !== ''
        ? {
            $regex: req.query.keyword,
            $options: 'i',
          }
        : {
            $regex: /[A-Za-z]/,
            $options: 'i',
          },
  }

  if (from_date || to_date) {
    const roomsData = await Room.find({ ...filter }).sort({ createdAt: -1 })

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
    const count = await Room.countDocuments({ ...filter })

    const rooms = await Room.find({ ...filter })
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ rooms, page, pages: Math.ceil(count / pageSize) })
  }
})

// @desc    Fetch all rooms (with filters)
// @route   GET /api/rooms/admin/search/:keyword/page/:pageNumber
// @access  Public
const getRoomsForAdmin = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
  const adminPageSize = Number(process.env.ADMIN_PAGE_SIZE)
  const page = Number(req.query.pageNumber) || 1

  if (keyword) {
    const data = await Room.find({}).sort({ createdAt: -1 })

    const filterRooms = data.filter(
      (room) =>
        room._id.toString().includes(`${keyword}`) ||
        room.hotelName.includes(`${keyword}`) ||
        room.address.includes(`${keyword}`) ||
        room.comfortType.includes(`${keyword}`) ||
        room.accommodationType.includes(`${keyword}`)
    )
    const rooms = filterRooms.slice(
      adminPageSize * page - adminPageSize,
      adminPageSize * page
    )

    res.json({
      rooms,
      page,
      pages: Math.ceil(filterRooms.length / adminPageSize),
      adminPageSize,
    })
  } else {
    const count = await Room.countDocuments({})
    const rooms = await Room.find({})
      .sort({ createdAt: -1 })
      .limit(adminPageSize)
      .skip(adminPageSize * (page - 1))

    res.json({
      rooms,
      page,
      pages: Math.ceil(count / adminPageSize),
      adminPageSize,
    })
  }
})

// @desc    Create a room
// @route   POST /api/rooms/create
// @access  Private/Admin
const createRoom = asyncHandler(async (req, res) => {
  const room = new Room({
    hotelName: 'Sample hotel name',
    address: 'Sample address',
    accommodationType: 'Sample type',
    comfortType: 'Sample comfort type',
    rentPerDay: 0,
    imageUrls: [],
    currentBookings: [],
    amenities: [],
    description: 'Sample description',
  })

  const createdRoom = await room.save()
  res.status(201).json(createdRoom)
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

// @desc    Delete room
// @route   DELETE /api/rooms/:id
// @access  Private/Admin
const deleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id)

  if (room) {
    const data = await Booking.find({})

    const relatedBookings = data.filter(
      (booking) => booking.room.toString() === room._id.toString()
    )

    if (relatedBookings.length) {
      let bookingsIds = []

      relatedBookings.map((booking) => {
        bookingsIds.push(booking._id.toString().substring(12))
      })

      res.status(404)
      throw new Error(
        `Unable to delete room ${room._id
          .toString()
          .substring(12)}! Related bookings: ${bookingsIds.join(' , ')}`
      )
    } else {
      await room.remove()
      res.json({ message: 'Room removed' })
    }
  } else {
    res.status(404)
    throw new Error('Room not found')
  }
})

export {
  getRooms,
  getRoomsForAdmin,
  getRoomById,
  deleteRoom,
  createRoom,
  //updateRoom,
}
