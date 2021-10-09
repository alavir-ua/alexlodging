import axios from 'axios'
import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
} from '../constants/bookingConstants'
import { logout } from './userActions'

export const createBooking = (booking) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BOOKING_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/booking`, booking, config)

    dispatch({
      type: BOOKING_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: BOOKING_CREATE_FAIL,
      payload: message,
    })
  }
}
