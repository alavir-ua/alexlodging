import mongoose from 'mongoose'

const roomSchema = mongoose.Schema(
  {
    hotelName: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    accommodationType: {
      type: String,
      require: true,
    },
    comfortType: {
      type: String,
      require: true,
    },
    rentPerDay: {
      type: Number,
      require: true,
    },
    imageUrls: [],
    currentBookings: [],
    amenities: [],
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
)

const Room = mongoose.model('Room', roomSchema)

export default Room
