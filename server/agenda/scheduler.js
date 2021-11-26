import agenda from './agenda.js'

const scheduler = {
  checkBookingForPayment: async (id) => {
    await agenda.schedule('in 2 minutes', 'checkBookingForPayment', { id })
  },
}

export default scheduler
