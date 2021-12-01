import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import Booking from '../models/bookingModel.js'
import User from '../models/userModel.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get all users
// @route   GET /api/users/page/:pageNumber/search/:keyword
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
  const pageSize = Number(process.env.ADMIN_PAGE_SIZE)
  const page = Number(req.query.pageNumber) || 1

  if (keyword) {
    const data = await User.find({})
      .select('-password')
      .sort({ createdAt: +1 })

    const filterUsers = data.filter(
      (user) =>
        user._id.toString().includes(`${keyword}`) ||
        user.name.includes(`${keyword}`) ||
        user.email.includes(`${keyword}`)
    )
    const users = filterUsers.slice(pageSize * page - pageSize, pageSize * page)

    res.json({
      users,
      page,
      pages: Math.ceil(filterUsers.length / pageSize),
      pageSize,
    })
  } else {
    const count = await User.countDocuments({})
    const users = await User.find({})
      .sort({ createdAt: +1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1))

    res.json({ users, page, pages: Math.ceil(count / pageSize), pageSize })
  }
})

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    const data = await Booking.find({})

    const relatedBookings = data.filter(
      (booking) => booking.user.toString() === user._id.toString()
    )

    if (relatedBookings.length) {
      let bookingsIds = []

      relatedBookings.map((booking) => {
        bookingsIds.push(booking._id.toString().substring(12))
      })

      res.status(404)
      throw new Error(
        `Unable to delete user ${
          user.name
        }! Related bookings: ${bookingsIds.join(' , ')}`
      )
    } else {
      await user.remove()
      res.json({ message: 'User removed' })
    }
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
}
