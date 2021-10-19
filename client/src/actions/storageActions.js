import axios from 'axios'
import {
  STORAGE_ADD_ROOM,
  STORAGE_SAVE_BILLING_ADDRESS,
} from '../constants/storageConstants'

export const addToStorage =
  (id, fromDate, toDate) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/rooms/${id}`)

    dispatch({
      type: STORAGE_ADD_ROOM,
      payload: {
        room: data._id,
        hotelName: data.hotelName,
        rentPerDay: data.rentPerDay,
        address: data.address,
        fromDate: fromDate,
        toDate: toDate,
      },
    })

    localStorage.setItem(
      'storageRoom',
      JSON.stringify(getState().storage.storageRoom)
    )
  }

export const saveBillingAddress = (data) => (dispatch) => {
  dispatch({
    type: STORAGE_SAVE_BILLING_ADDRESS,
    payload: data,
  })

  localStorage.setItem('billingAddress', JSON.stringify(data))
}
