import axios from 'axios'
import {
  ROOM_LIST_REQUEST,
  ROOM_LIST_SUCCESS,
  ROOM_LIST_FAIL,
  ROOM_ADMIN_LIST_REQUEST,
  ROOM_ADMIN_LIST_SUCCESS,
  ROOM_ADMIN_LIST_FAIL,
  ROOM_CREATE_REQUEST,
  ROOM_CREATE_SUCCESS,
  ROOM_CREATE_FAIL,
  ROOM_DETAILS_REQUEST,
  ROOM_DETAILS_SUCCESS,
  ROOM_DETAILS_FAIL,
  ROOM_DELETE_REQUEST,
  ROOM_DELETE_SUCCESS,
  ROOM_DELETE_FAIL,
} from '../constants/roomConstants'
import { logout } from './userActions'

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

export const listAdminRooms =
  (keyword = '', pageNumber = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ROOM_ADMIN_LIST_REQUEST })

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const { data } = await axios.get(
        `/api/rooms/admin?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      )

      dispatch({
        type: ROOM_ADMIN_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ROOM_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createRoom = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/rooms/create`, {}, config)

    dispatch({
      type: ROOM_CREATE_SUCCESS,
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
      type: ROOM_CREATE_FAIL,
      payload: message,
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

export const deleteRoom = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ROOM_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/rooms/${id}`, config)

    dispatch({ type: ROOM_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: ROOM_DELETE_FAIL,
      payload: message,
    })
  }
}
