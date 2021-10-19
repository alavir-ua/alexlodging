import {
  STORAGE_ADD_ROOM,
  STORAGE_SAVE_BILLING_ADDRESS,
  STORAGE_REMOVE_ROOM,
} from '../constants/storageConstants'

export const storageReducer = (
  state = { storageRoom: {}, billingAddress: {} },
  action
) => {
  switch (action.type) {
    case STORAGE_ADD_ROOM:
      const room = action.payload

      return {
        ...state,
        storageRoom: room,
      }

    case STORAGE_SAVE_BILLING_ADDRESS:
      return {
        ...state,
        billingAddress: action.payload,
      }
    case STORAGE_REMOVE_ROOM:
      return {
        ...state,
        storageRoom: {},
      }
    default:
      return state
  }
}
