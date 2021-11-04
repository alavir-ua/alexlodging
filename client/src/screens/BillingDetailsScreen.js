import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from 'components/FormContainer'
import CheckoutSteps from 'components/CheckoutSteps'
import { saveBillingAddress } from 'actions/storageActions'
import { createBooking } from 'actions/bookingActions'
import { BOOKING_CREATE_RESET } from 'constants/bookingConstants'
import { USER_DETAILS_RESET } from 'constants/userConstants'

import Meta from '../components/Meta'

const BillingDetailsScreen = ({ history }) => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const dispatch = useDispatch()

  const bookingCreate = useSelector((state) => state.bookingCreate)
  const { booking, success, error } = bookingCreate

  const stateStorage = useSelector((state) => state.storage)
  const { storageRoom } = stateStorage

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveBillingAddress({ address, city, postalCode, country }))
    history.push('/payment')
  }

  useEffect(() => {
    dispatch(
      createBooking({
        room: storageRoom.id,
        fromDate: storageRoom.fromDate,
        toDate: storageRoom.toDate,
        /*totalAmount,
        totalDays,*/
      })
    )
    if (success) {
      dispatch({ type: USER_DETAILS_RESET })
      dispatch({ type: BOOKING_CREATE_RESET })
      history.push(`/payment/${booking._id}`)
    }
  }, [history, success, booking])

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <Meta
        title="Billing Details"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1600293558767-d66eaa33a38e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1536&q=80) top center;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      <FormContainer>
        <h2>Billing Details</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="country">
            <Form.Label>
              Country{' '}
              <span className="al-iso-text">
                (according to ISO 3166-1 alpha-2 for Stripe)
              </span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button className="mt-3 al-btn-right" type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default BillingDetailsScreen
