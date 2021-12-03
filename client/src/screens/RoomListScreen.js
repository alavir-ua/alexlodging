import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listAdminRooms, deleteRoom, createRoom } from '../actions/roomActions'
import { ROOM_CREATE_RESET } from '../constants/roomConstants'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const RoomListScreen = ({ history, match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const roomAdminList = useSelector((state) => state.roomAdminList)
  const { loading, error, rooms, page, pages, adminPageSize } = roomAdminList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const roomDelete = useSelector((state) => state.roomDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = roomDelete

  const roomCreate = useSelector((state) => state.roomCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    room: createdRoom,
  } = roomCreate

  useEffect(() => {
    dispatch({ type: ROOM_CREATE_RESET })

    if (userInfo && userInfo.isAdmin) {
      dispatch(listAdminRooms(keyword, pageNumber))
    } else {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/admin/room/${createdRoom._id}/edit`)
    } else {
      dispatch(listAdminRooms(keyword, pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdRoom,
    pageNumber,
    keyword,
  ])

  const deleteHandler = (id) => {
    if (window.confirm(`Really delete room from ${id.substring(12)}`)) {
      dispatch(deleteRoom(id))
    }
  }

  const createRoomHandler = () => {
    dispatch(createRoom())
  }

  return (
    <>
      <Meta title="Admin Rooms" />
      <Col sm={12} className="d-flex justify-content-between">
        <h2>Rooms</h2>
        <Button className="my-2" onClick={createRoomHandler}>
          <i className="fas fa-plus" /> Add Room
        </Button>
      </Col>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID(shortened)</th>
                <th>HOTEL, ADDRESS</th>
                <th>TYPE</th>
                <th>COMFORT</th>
                <th>COST</th>
                <th>CURRENT BOOKINGS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room._id}>
                  <td>{adminPageSize * (pageNumber - 1) + index + 1}</td>
                  <td>{room._id.substring(12)}</td>
                  <td>
                    {room.hotelName},<br />
                    {room.address}
                  </td>
                  <td>{room.accommodationType}</td>
                  <td>{room.comfortType}</td>
                  <td>${room.rentPerDay}</td>
                  <td>
                    {room.currentBookings.map((element, index) => {
                      return (
                        <Link
                          key={index}
                          to={`/booking/${element.booking}`}
                          className="d-block al-admin-link"
                        >
                          {element.booking.toString().substring(12)}
                        </Link>
                      )
                    })}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/room/${room._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm btn-red"
                      onClick={() => deleteHandler(room._id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            isAdmin={true}
            type="rooms"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default RoomListScreen
