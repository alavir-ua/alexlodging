import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Image, ListGroup, Row, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { listRoomDetails } from '../actions/roomActions'
import { createBooking } from '../actions/bookingActions'
import { getUserDetails } from '../actions/userActions'
import { BOOKING_CREATE_RESET } from '../constants/bookingConstants'
import { USER_DETAILS_RESET } from '../constants/userConstants'
import AOS from 'aos'
import 'aos/dist/aos.css'
import moment from 'moment'
AOS.init({
  duration: '1000',
})

const BookingScreen = ({ match }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const stateRoomDetails = useSelector((state) => state.roomDetails)
  const { loading, error, room } = stateRoomDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const stateBookingCreate = useSelector((state) => state.bookingCreate)
  const { booking, success, error: bookingCreateError } = stateBookingCreate

  const fromDate = moment(match.params.fromdate, 'YYYY-MM-DD')
  const toDate = moment(match.params.todate, 'YYYY-MM-DD')

  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1
  const totalAmount = totalDays * room.rentPerDay

  useEffect(() => {
    if (!room._id || room._id !== match.params.roomid) {
      dispatch(listRoomDetails(match.params.roomid))
    }
    if (success) {
      history.push(`/booking/${booking._id}/stripe`)
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: BOOKING_CREATE_RESET })
    }
    if (!user || !user.name) {
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, history, match.params.roomid, room, user, booking, success])

  const placeBookingHandler = async () => {
    const bookingDetails = {
      room: room._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
    }
    dispatch(createBooking(bookingDetails))
  }

  /*const fullAddress = async function (room) {
    return <p>{room.address.city + ',' + room.address.street}</p>
  }*/

  return (
    <>
      <Meta
        title="Room booking"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80) top center;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      {loading ? (
        <Loader />
      ) : error || bookingCreateError ? (
        <Message variant="danger">{error || bookingCreateError}</Message>
      ) : (
        <Row
          className="bs"
          data-aos="zoom-in"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
        >
          <Col md={6}>
            <h5 className="mb-0">{room.hotelName}</h5>
            <p className="address-text">{room.address}</p>
            <Image src={room.imageUrls[0]} alt={room.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <h3>Booking details</h3>
              <ListGroup.Item>
                <b>Name: {user.name}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>From Date:</b> {match.params.fromdate}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>To Date:</b> {match.params.todate}
              </ListGroup.Item>
            </ListGroup>
            <ListGroup variant="flush">
              <h3>Amount</h3>
              <ListGroup.Item>
                <b>Total days:</b> {totalDays}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Rent per day:</b> {room.rentPerDay}$
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Total Amount:</b> {totalAmount}$
              </ListGroup.Item>
            </ListGroup>
            <hr />
            <div style={{ float: 'right' }}>
              <Button
                className="btn btn-dark m-2"
                onClick={placeBookingHandler}
              >
                Place Booking
              </Button>

              <Button
                className="btn btn-dark m-2"
                onClick={() => {
                  history.goBack()
                }}
              >
                Go Back
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookingScreen
