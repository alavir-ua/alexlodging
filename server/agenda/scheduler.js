import agenda from './agenda.js'

const scheduler = {
  checkBookingForPayment: async (id) => {
    await agenda.schedule('in 20 minutes', 'checkBookingForPayment', { id })
  },
}

export default scheduler
