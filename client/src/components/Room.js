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
    <div className="al-room-box al-box-shadow" data-aos="zoom-in">
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
              {room.amenities.map((element) => {
                return (
                  <span
                    className="material-icons"
                    key={element}
                    title={element}
                  >
                    {element}
                  </span>
                )
              })}
            </ListGroup.Item>
          </ListGroup>
          <hr />
          <div className="al-room__btn-group">
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
                    className="d-block w-100 al-big-image"
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
