import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux'

const CheckoutSteps = ({ step1, step2, step3, step4, id = '' }) => {
  const stateStorage = useSelector((state) => state.storage)
  const { bookingDetails } = stateStorage

  const link = `/details/${bookingDetails.room}/${bookingDetails.fromDate}/${bookingDetails.toDate}`

  return (
    <Nav className="justify-content-center mb-4 al-box-shadow al-step-links">
      <Nav.Item>
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 && !id ? (
          <LinkContainer to={link}>
            <Nav.Link>Booking Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Booking Details</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/billing">
            <Nav.Link>Billing Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Billing Address</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Pay Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Pay Booking</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
