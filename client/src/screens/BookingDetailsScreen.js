import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import { Col, Image, ListGroup, Row, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { getUserDetails } from '../actions/userActions'
import CheckoutSteps from '../components/CheckoutSteps'
import AOS from 'aos'
import 'aos/dist/aos.css'
import moment from 'moment'
AOS.init({
  duration: '1000',
})

const BookingDetailsScreen = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const stateStorage = useSelector((state) => state.storage)
  const { storageRoom } = stateStorage

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  const totalDays =
    moment
      .duration(
        moment(storageRoom.toDate, 'YYYY-MM-DD').diff(
          moment(storageRoom.fromDate, 'YYYY-MM-DD')
        )
      )
      .asDays() + 1
  const totalAmount = Math.trunc(totalDays * storageRoom.cost)

  useEffect(() => {
    if (!user || !user.name) {
      dispatch(getUserDetails('profile'))
    }
  }, [dispatch, history, user])

  return (
    <>
      <CheckoutSteps step1 step2 />
      <Meta
        title="Booking Details"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80) top center;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      <Row
        className="al-content-box al-box-shadow"
        data-aos="zoom-in"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <Col md={6}>
          <h5 className="mb-0">{storageRoom.hotelName}</h5>
          <p className="address-text">{storageRoom.address}</p>
          <Image src={storageRoom.image} alt={storageRoom.hotelName} fluid />
        </Col>
        <Col md={6}>
          <ListGroup variant="flush">
            <h3>Booking details</h3>
            <ListGroup.Item>
              <b>Name: {user.name}</b>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>From Date:</b> {storageRoom.fromDate}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>To Date:</b> {storageRoom.toDate}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <h3>Amount</h3>
            <ListGroup.Item>
              <b>Total days:</b> {totalDays}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Rent per day:</b> {storageRoom.cost}$
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Total Amount:</b> {totalAmount}$
            </ListGroup.Item>
          </ListGroup>
          <hr />
          <div style={{ float: 'right' }}>
            <Button
              className="btn btn-dark m-2"
              /*onClick={placeBookingHandler}*/
            >
              Continue
            </Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default BookingDetailsScreen
