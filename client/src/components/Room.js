import React, { useState } from 'react'
import {
  Row,
  Col,
  Modal,
  Image,
  ListGroup,
  Button,
  Carousel,
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init({
  duration: '1000',
})

const Room = ({ room, fromdate, todate }) => {
  const history = useHistory()
  const [show, setShow] = useState(false)

  const stateUserLogin = useSelector((state) => state.userLogin)
  const { userInfo } = stateUserLogin

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const bookRoom = () => {
    if (!userInfo) {
      alert('Please login to continue')
    } else {
      history.push(`/booking/${room._id}/${fromdate}/${todate}`)
    }
  }

  return (
    <div
      className="bs"
      data-aos="zoom-in"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
      <Row>
        <Col md={4}>
          <Image src={room.imageUrls[0]} alt={room.hotelName} fluid />
        </Col>
        <Col md={7}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{room.hotelName}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Accommodation Type:</b> {room.accommodationType}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Comfort Type:</b> {room.comfortType}
            </ListGroup.Item>
            <ListGroup.Item>
              <b>Rent per Day:</b> ${room.rentPerDay}
            </ListGroup.Item>
            <ListGroup.Item>
              <span className="material-icon-outlined">location_city</span>
              <span className="material-icon-outlined">wifi</span>
              <span className="material-icon-outlined">bathtub</span>
              <span className="material-icon-outlined">as_unit</span>
              <span className="material-icon-outlined">family_restroom</span>
              <span className="material-icon-outlined">fitness_center</span>
              <span className="material-icon-outlined">smoke_free</span>
              <span className="material-icon-outlined">wine_bar</span>
              <span className="material-icon-outlined">local_parking</span>
              <span className="material-icon-outlined">coffee_maker</span>
              <span className="material-icon-outlined">accessible</span>
            </ListGroup.Item>
          </ListGroup>
          <hr />
          <div style={{ float: 'right' }}>
            {fromdate && todate && (
              <Button className="btn btn-dark m-2" onClick={bookRoom}>
                Book Now
              </Button>
            )}
            <Button className="btn btn-dark m-2" onClick={handleShow}>
              View Details
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{room.hotelName}</Modal.Title>
          <Button
            style={{ float: 'right' }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageUrls.map((url) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100 bigimg"
                    src={url}
                    alt="First slide"
                  />
                </Carousel.Item>
              )
            })}
          </Carousel>
          <p
            style={{
              marginTop: '5px',
              marginBottom: '5px',
            }}
          >
            {room.description}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Room
