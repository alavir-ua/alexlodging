import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row className="pt-4">
          <Col lg={8} md={6} sm={12}>
            <h6 className="text-uppercase font-weight-bold text-light">
              Additional Information
            </h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              consequatur dolore dolores dolorum facilis fugit necessitatibus,
              pariatur provident quasi ratione!
            </p>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <h6 className="text-uppercase font-weight-bold text-light">
              Contact
            </h6>
            <p>
              <i className="fa fa-map-marker al-yellow-icon"></i>&nbsp;54028
              Klivlend str.28, Mykolaiv, Ukraine
              <br />
              <i className="fa fa-at al-yellow-icon"></i>
              &nbsp;info@mywebsite.com
              <br />
              <i className="fa fa-phone al-yellow-icon"></i>&nbsp;+38 (099) 234
              567 88
            </p>
          </Col>
          <Col className="text-center pb-2 pt-2 al-border-yellow">
            &copy; O.G.Fedorenko, 2021
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
