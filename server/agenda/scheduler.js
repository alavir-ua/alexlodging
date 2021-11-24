import agenda from './agenda.js'

const scheduler = {
  checkBookingForPayment: async (id) => {
    await agenda.schedule('in 30 second', 'checkBookingForPayment', { id })
  },
}

export default scheduler
