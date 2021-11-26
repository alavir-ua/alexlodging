import {
  STORAGE_SAVE_BOOKING_DETAILS,
  STORAGE_SAVE_BILLING_ADDRESS,
  STORAGE_RESET,
} from '../constants/storageConstants'

export const storageReducer = (
  state = { bookingDetails: {}, billingAddress: {} },
  action
) => {
  switch (action.type) {
    case STORAGE_SAVE_BOOKING_DETAILS:
      return {
        ...state,
        bookingDetails: action.payload,
      }

    case STORAGE_SAVE_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload,
      }
    case STORAGE_RESET:
      return {
        ...state,
        bookingDetails: {},
        billingAddress: {},
      }
    default:
      return state
  }
}
