import mongoose from 'mongoose'

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    fromDate: {
      type: String,
      require: true,
    },
    toDate: {
      type: String,
      require: true,
    },
    totalAmount: {
      type: Number,
      require: true,
    },
    totalDays: {
      type: Number,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      require: true,
      default: 'booked',
    },
  },
  { timestamps: true }
)

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
