import axios from 'axios'
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from '../constants/roomConstants'

export const listRooms =
  (pageNumber = '', fromdate = '', todate = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/rooms?pageNumber=${pageNumber}&fromdate=${fromdate}&todate=${todate}`
      )

      dispatch({
        type: ROOM_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ROOM_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const listRoomDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROOM_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/rooms/${id}`)

    dispatch({
      type: ROOM_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
