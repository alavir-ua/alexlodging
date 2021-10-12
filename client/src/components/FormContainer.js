import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  duration: '1000',
})

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row
        className="justify-content-md-center al-box-shadow"
        data-aos="zoom-in"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
      >
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default FormContainer
