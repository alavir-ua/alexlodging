import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyBookings } from '../actions/bookingActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Meta from '../components/Meta'
import moment from 'moment'
import 'moment/locale/en-gb'

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile

  const bookingListMy = useSelector((state) => state.bookingListMy)
  const {
    loading: loadingBookings,
    error: errorBookings,
    bookings,
  } = bookingListMy

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user || !user.name || successUpdate) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyBookings())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        password,
        confirmPassword,
      })
    )
  }

  return (
    <>
      <Meta title="User Profile" />
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {successUpdate && (
            <Message variant="success">Profile Updated</Message>
          )}
          {loadingUpdate && <Loader />}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Update
              </Button>
            </Form>
          )}
        </Col>
        <Col md={9}>
          <h2>My Bookings</h2>
          {loadingBookings ? (
            <Loader />
          ) : errorBookings ? (
            <Message variant="danger">{errorBookings}</Message>
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>BOOKED AT</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>{booking._id}</td>
                    <td>{booking.status.toUpperCase()}</td>
                    <td>{moment(booking.createdAt).format('LLL')}</td>
                    <td>
                      <LinkContainer to={`/booking/${booking._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
