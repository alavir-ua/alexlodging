import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import { Col, Image, ListGroup, Row, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import { listRoomDetails } from '../actions/roomActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveBookingDetails } from '../actions/storageActions'
import AOS from 'aos'
import 'aos/dist/aos.css'
import moment from 'moment'

AOS.init({
  duration: '1000',
})

const BookingDetailsScreen = ({ match }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const stateRoomDetails = useSelector((state) => state.roomDetails)
  const { loading, error, room } = stateRoomDetails

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const stateStorage = useSelector((state) => state.storage)
  const { bookingDetails } = stateStorage

  const totalDays =
    moment
      .duration(
        moment(match.params.toDate, 'YYYY-MM-DD').diff(
          moment(match.params.fromDate, 'YYYY-MM-DD')
        )
      )
      .asDays() + 1

  useEffect(() => {
    if (!room._id || room._id !== match.params.id) {
      dispatch(listRoomDetails(match.params.id))
    }
    if (!user || !user.name) {
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, match, room._id, user])

  const totalAmount = Math.trunc(totalDays * room.rentPerDay)

  const clickHandler = (e) => {
    e.preventDefault()
    if (!bookingDetails.room || bookingDetails.room !== room._id) {
      dispatch(
        saveBookingDetails(
          room._id,
          user._id,
          match.params.fromDate,
          match.params.toDate,
          totalDays,
          totalAmount
        )
      )
    }
    history.push('/billing')
  }

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Meta
        title="Booking Details"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);
            min-height: 100vh;
            background-position: top center;
            background-repeat: no-repeat;
            background-size: auto;
            background-attachment: fixed;
        }
    "
      />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="al-content-box al-box-shadow" data-aos="zoom-in">
          <Col md={6}>
            <h5 className="mb-0">{room.hotelName}</h5>
            <p className="address-text">{room.address}</p>
            <Image src={room.imageUrls[0]} alt={room.hotelName} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <h3>Booking details</h3>
              <ListGroup.Item>
                <b>Name: {user.name}</b>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>From Date:</b> {match.params.fromDate}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>To Date:</b> {match.params.toDate}
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
            <Button
              type="submit"
              className="btn btn-dark m-2 al-btn-right"
              onClick={clickHandler}
            >
              Continue
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookingDetailsScreen
