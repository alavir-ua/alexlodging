import {
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_RESET,
} from '../constants/bookingConstants'

export const bookingCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return {
        loading: true,
      }
    case BOOKING_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        booking: action.payload,
      }
    case BOOKING_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case BOOKING_CREATE_RESET:
      return {}
    default:
      return state
  }
}
