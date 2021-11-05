import axios from 'axios'
import {
  STORAGE_SAVE_BOOKING_DETAILS,
  STORAGE_SAVE_BILLING_ADDRESS,
  STORAGE_RESET,
} from 'constants/storageConstants'

export const saveBookingDetails =
  (room, user, fromDate, toDate, totalDays, totalAmount) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/rooms/${room}`)

    dispatch({
      type: STORAGE_SAVE_BOOKING_DETAILS,
      payload: {
        room: data._id,
        user,
        fromDate,
        toDate,
        totalDays,
        totalAmount,
      },
    })

    localStorage.setItem(
      'bookingDetails',
      JSON.stringify(getState().storage.bookingDetails)
    )
  }

export const saveBillingAddress = (data) => (dispatch, getState) => {
  dispatch({
    type: STORAGE_SAVE_BILLING_ADDRESS,
    payload: data,
  })

  localStorage.setItem(
    'billingAddress',
    JSON.stringify(getState().storage.billingAddress)
  )
}

export const resetStorage = () => (dispatch, getState) => {
  dispatch({
    type: STORAGE_RESET,
  })

  localStorage.setItem(
    'bookingDetails',
    JSON.stringify(getState().storage.bookingDetails)
  )

  localStorage.setItem(
    'billingAddress',
    JSON.stringify(getState().storage.billingAddress)
  )
}
