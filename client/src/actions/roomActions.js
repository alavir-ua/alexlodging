import axios from 'axios'
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
} from 'constants/roomConstants'

export const listRooms =
  (
    pageNumber = '',
    keyword = '',
    fromdate = '',
    todate = '',
    filterData = {}
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ROOM_LIST_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      const { data } = await axios.post(
        `/api/rooms?pageNumber=${pageNumber}&keyword=${keyword}&fromdate=${fromdate}&todate=${todate}`,
        filterData,
        config
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
