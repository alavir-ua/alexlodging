import React, { useState, useEffect } from 'react'
import { Row, Col, ListGroup } from 'react-bootstrap'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import CheckoutSteps from '../components/CheckoutSteps'
import Meta from '../components/Meta'

import { getBookingDetails, payBooking } from '../actions/bookingActions'
import { STRIPE_PAY_RESET } from '../constants/stripeConstants'
import { createStripePay } from '../actions/stripeActions'
import { resetStorage } from '../actions/storageActions'
import { BOOKING_PAY_RESET } from '../constants/bookingConstants'

import { loadStripe } from '@stripe/stripe-js'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: '1000',
})

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
  locale: 'en',
})

const CARD_OPTIONS = {
  iconStyle: 'solid',
  hidePostalCode: true,
  style: {
    base: {
      iconColor: 'yellow',
      color: '#ffffff',
      fontWeight: 400,
      fontFamily: 'Helvetica, sans-serif',
      fontSize: '19px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': { color: '#fce883' },
      '::placeholder': { color: '#ffffff' },
    },
    invalid: {
      iconColor: '#ff0000',
      color: '#ff0000',
    },
  },
}

const BookingScreenStripe = ({ match, history }) => {
  const bookingId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const [cardError, setCardError] = useState('')

  const dispatch = useDispatch()

  const bookingStateDetails = useSelector((state) => state.bookingDetails)
  const { booking, loading, error } = bookingStateDetails

  const stateStorage = useSelector((state) => state.storage)
  const { bookingDetails, billingAddress } = stateStorage

  const bookingPay = useSelector((state) => state.bookingPay)
  const { success: successPay } = bookingPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const stripePay = useSelector((state) => state.stripePay)
  const { loadingStripePay, stripePaymentError, stripePaymentResult } =
    stripePay

  const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (event) => {
      event.preventDefault()

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: billingAddress.city,
            country: billingAddress.country,
            line1: billingAddress.address,
            line2: null,
            postal_code: billingAddress.postalCode,
            state: null,
          },
          email: userInfo.email,
          name: userInfo.name,
          phone: null,
        },
      })

      if (!error) {
        const { id } = paymentMethod
        dispatch(createStripePay(id, bookingDetails))
      } else {
        setCardError(error.message)
      }
    }

    const handleFocus = () => {
      setCardError('')
    }

    return (
      <form className="form-stripe" onSubmit={handleSubmit}>
        <CardElement
          className="CardElement"
          options={CARD_OPTIONS}
          onFocus={handleFocus}
        />
        <button className="btn-stripe" type="submit">
          Pay ${bookingDetails.totalAmount}
        </button>
      </form>
    )
  }

  const StripeContainer = () => {
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    }

    if (!booking || successPay || booking._id !== bookingId) {
      dispatch({ type: BOOKING_PAY_RESET })
      dispatch(getBookingDetails(bookingId))
    } else if (!booking.isPaid) {
      setSdkReady(true)
    }
    if (stripePaymentResult) {
      dispatch(payBooking(bookingId, stripePaymentResult))
      dispatch({ type: STRIPE_PAY_RESET })
      dispatch(resetStorage())
    }
  }, [
    dispatch,
    bookingId,
    successPay,
    booking,
    history,
    userInfo,
    stripePaymentResult,
  ])

  return (
    <>
      {booking && !booking.isPaid && !userInfo.isAdmin && (
        <CheckoutSteps step1 step2 step3 step4 />
      )}
      <Meta
        title={booking && booking.isPaid ? booking._id.toUpperCase() : 'Charge'}
        style="
       main {
            background: url(https://images.unsplash.com/photo-1588625500633-a0cd518f0f60?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80);
            min-height: 100vh;
            background-position: top center;
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
          <Col sm={12}>
            <h3>Booking {booking._id}</h3>
          </Col>
          <Col md={7}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Details</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Apartment:</b> {booking.room.hotelName},
                {booking.room.address}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>From Date:</b> {booking.fromDate}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>To Date:</b> {booking.toDate}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Total days:</b> {booking.totalDays}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Total Amount:</b> {booking.totalAmount}$
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment</h3>

                {booking.isPaid ? (
                  <>
                    <p>
                      <strong>Method: </strong>
                      {booking.paymentResult.id}
                    </p>
                    <Message variant="success">
                      Paid on {booking.paidAt}
                    </Message>
                  </>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Billing</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Name: </b> {booking.user.name}
              </ListGroup.Item>
              <ListGroup.Item>
                <b>Email: </b>{' '}
                <a href={`mailto:${booking.user.email}`}>
                  {booking.user.email}
                </a>
              </ListGroup.Item>
              {!booking.isPaid && (
                <>
                  <ListGroup.Item>
                    <b>Address: </b>
                    {billingAddress.address}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>City: </b>
                    {billingAddress.city}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Postal Code: </b>
                    {billingAddress.postalCode}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <b>Country: </b>
                    {billingAddress.country}
                  </ListGroup.Item>
                </>
              )}
            </ListGroup>

            {!userInfo.isAdmin && (
              <ListGroup variant="flush" className="mt-4">
                <ListGroup.Item style={{ padding: 0 }}>
                  {cardError && <Message variant="danger">{cardError}</Message>}
                  {stripePaymentError && (
                    <Message variant="danger">{stripePaymentError}</Message>
                  )}
                  {sdkReady &&
                    (loadingStripePay ? (
                      <Loader />
                    ) : (
                      <>
                        <h3>Stripe payment</h3>
                        <StripeContainer booking={bookingDetails} />
                      </>
                    ))}
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      )}
    </>
  )
}

export default BookingScreenStripe
