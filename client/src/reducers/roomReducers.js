import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_ADMIN_LIST_REQUEST,
  ROOM_ADMIN_LIST_SUCCESS,
  ROOM_ADMIN_LIST_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DETAILS_RESET,
} from '../constants/roomConstants'

export const roomListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_LIST_REQUEST:
      return { loading: true, rooms: [] }
    case ROOM_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case ROOM_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const roomAdminListReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case ROOM_ADMIN_LIST_REQUEST:
      return { loading: true, rooms: [] }
    case ROOM_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        rooms: action.payload.rooms,
        pages: action.payload.pages,
        page: action.payload.page,
        adminPageSize: action.payload.adminPageSize,
      }
    case ROOM_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const roomDetailsReducer = (
  state = { room: { imageUrls: [], currentBookings: [], amenities: [] } },
  action
) => {
  switch (action.type) {
    case ROOM_DETAILS_REQUEST:
      return { ...state, loading: true }
    case ROOM_DETAILS_SUCCESS:
      return { loading: false, room: action.payload }
    case ROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case ROOM_DETAILS_RESET:
      return { room: { imageUrls: [], currentBookings: [], amenities: [] } }
    default:
      return state
  }
}
