import Agenda from 'agenda'
import dotenv from 'dotenv'
import { checkBookingForPayment } from '../controllers/bookingController.js'

dotenv.config()

const agenda = new Agenda({
  db: { address: process.env.MONGO_URI, collection: 'agendaJobs' },
})

agenda
  .on('ready', () => console.log('Agenda started!'))
  .on('error', () => console.log('Agenda connection error!'))

agenda.define('checkBookingForPayment', async (job) => {
  const { id } = job.attrs.data
  await checkBookingForPayment(id)
})

agenda.start()

export default agenda
