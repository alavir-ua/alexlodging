import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-center mb-4 al-box-shadow step-links">
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
        {step2 ? (
          <LinkContainer to="/details">
            <Nav.Link>Booking Details</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Booking Details</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/billing">
            <Nav.Link>Billing Address</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Billing Address</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placebooking">
            <Nav.Link>Place Booking</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Booking</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
