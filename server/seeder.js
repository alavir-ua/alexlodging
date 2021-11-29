import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Room from './models/roomModel.js'
import Booking from './models/bookingModel.js'
import connectDB from './config/db.js'
import faker from 'faker'
import hotels from './data/hotels.js'
import moment from 'moment'
import _ from 'lodash'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Room.deleteMany()
    await User.deleteMany()
    await Booking.deleteMany()

    const userUuids = []

    //creating Admin
    const admin = new User({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: '4321',
      isAdmin: true,
    })

    const createdAdmin = await admin.save()
    const adminUuid = createdAdmin._id

    console.log('Admin'.green, adminUuid)
    console.log('--------------------------------'.yellow)

    //creating of 20 users
    for (let i = 1; i < 21; i++) {
      const name = faker.name.findName()
      const email = (name + '@gmail.com').split(' ').join('')

      const user = new User({
        name,
        email: email.toLowerCase(),
        password: '1234',
        isAdmin: false,
      })

      const createdUser = await user.save()
      const userUuid = createdUser._id
      userUuids.push(userUuid)

      console.log(`User #${i}`.cyan, userUuid)
    }
    console.log('--------------------------------'.yellow)

    //creating of 20 rooms
    const roomUuids = []

    const accommodation = ['Single', 'Double', 'Triple', 'Extra Bed']
    const comfort = ['Suite', 'De Luxe', 'Duplex', 'Studio', 'Standart']
    const amenities = [
      'location_city',
      'wifi',
      'bathtub',
      'ac_unit',
      'family_restroom',
      'fitness_center',
      'smoke_free',
      'wine_bar',
      'local_parking',
      'coffee_maker',
      'accessible',
    ]

    let idx = 0
    for (const element of hotels) {
      const room = new Room({
        hotelName: element.name,
        address:
          'London,' +
          faker.address.streetAddress() +
          ',' +
          faker.address.secondaryAddress().toLowerCase(),
        accommodationType:
          accommodation[Math.floor(Math.random() * accommodation.length)],
        comfortType: comfort[Math.floor(Math.random() * comfort.length)],
        rentPerDay: faker.datatype.number({
          min: 150,
          max: 600,
        }),
        imageUrls: element.images,
        currentBookings: [],
        amenities: _.sampleSize(
          amenities,
          faker.datatype.number({
            min: 4,
            max: 8,
          })
        ),
        description: faker.lorem.paragraphs(),
      })

      const createdRoom = await room.save()
      const roomUuid = createdRoom._id
      roomUuids.push(roomUuid)

      idx += 1
      console.log(`Room #${idx}`.cyan, roomUuid)
    }
    console.log('--------------------------------'.yellow)

    //creating of 20 bookings
    let idy = 0
    for (const roomUuid of roomUuids) {
      const room = await Room.findById(roomUuid)

      //get random user id
      const randomUser = await User.findById(
        userUuids[Math.floor(Math.random() * userUuids.length)]
      )

      const randUserUuid = randomUser._id

      const futureDate = faker.date.future(0.5, new Date())
      const pastDate = faker.date.past(0.1, new Date())
      const leaseDuration = faker.datatype.number({
        min: 2,
        max: 12,
      })

      const paymentDelay = faker.datatype.number({
        min: 1,
        max: 19,
      })

      const paidAt = new Date(pastDate.getTime() + paymentDelay * 60000)
      const fromDate = moment(new Date(futureDate)).format('YYYY-MM-DD')
      const toDate = moment(
        new Date(futureDate.getTime() + leaseDuration * 1440 * 60000)
      ).format('YYYY-MM-DD')

      const booking = new Booking({
        user: randUserUuid,
        room: roomUuid,
        fromDate,
        toDate,
        totalDays: leaseDuration + 1,
        paymentResult: {
          id: 'pi_' + faker.finance.bitcoinAddress().substr(0, 24),
          status: 'succeeded',
          update_time: paidAt,
          email_address: randomUser.email,
        },
        totalAmount: Math.trunc((leaseDuration + 1) * room.rentPerDay),
        isPaid: true,
        paidAt: paidAt,
        status: 'booked',
        createdAt: pastDate,
      })

      const createdBooking = await booking.save()

      room.currentBookings.push({
        booking: createdBooking._id,
        fromDate: createdBooking.fromDate,
        toDate: createdBooking.toDate,
        user: createdBooking.user,
      })

      await room.save()

      idy += 1
      console.log(`Booking #${idy}`.cyan, createdBooking._id)
    }
    console.log('--------------------------------'.yellow)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Room.deleteMany()
    await User.deleteMany()
    await Booking.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
