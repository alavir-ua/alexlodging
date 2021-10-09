import dotenv from 'dotenv'
import colors from 'colors'
import User from './models/userModel.js'
import Room from './models/roomModel.js'
import connectDB from './config/db.js'
import faker from 'faker'
import hotels from './data/hotels.js'
import _ from 'lodash'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Room.deleteMany()
    // await User.deleteMany()
    //
    // //creating Admin
    // const admin = new User({
    //   name: 'Admin',
    //   email: 'admin@gmail.com',
    //   password: '4321',
    //   isAdmin: true,
    // })
    //
    // const createdAdmin = await admin.save()
    // const adminUuid = createdAdmin._id
    //
    // console.log('Admin'.green, adminUuid)
    // console.log('--------------------------------'.yellow)
    //
    // //creating of 5 users
    // for (let i = 1; i < 6; i++) {
    //   const name = faker.name.findName()
    //   const email = (name + '@gmail.com').split(' ').join('')
    //
    //   const user = new User({
    //     name,
    //     email: email.toLowerCase(),
    //     password: '1234',
    //     isAdmin: false,
    //   })
    //
    //   const createdUser = await user.save()
    //   const userUuid = createdUser._id
    //
    //   console.log(`User #${i}`.cyan, userUuid)
    // }
    // console.log('--------------------------------'.yellow)

    const accommodation = ['Single', 'Double', 'Triple', 'Extra Bed']
    const comfort = ['Suite', 'De Luxe', 'Duplex', 'Studio', 'Standart']
    const amenities = [
      'mdiCity',
      'mdiWifi',
      'mdiShower',
      'mdiSnowflake',
      'mdiHumanMaleFemaleChild',
      'mdiDumbbell',
      'mdiSmokingOff',
      'mdiGlassCocktail',
      'mdiAlphaPBoxOutline',
      'mdiCoffeeMaker',
      'mdiHumanWheelchair',
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
            min: 5,
            max: 11,
          })
        ),
        description: faker.lorem.paragraphs(),
      })

      const createdRoom = await room.save()
      const roomUuid = createdRoom._id
      idx += 1
      console.log(`Room #${idx}`.cyan, roomUuid)
    }
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
