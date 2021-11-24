import Agenda from 'agenda'
import { checkBookingForPayment } from '../controllers/bookingController.js'

const agenda = new Agenda({
  db: { address: 'mongodb://localhost/alexlondging', collection: 'agendaJobs' },
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
