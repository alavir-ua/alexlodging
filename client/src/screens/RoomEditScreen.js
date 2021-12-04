import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listRoomDetails, updateRoom } from '../actions/roomActions'
import { ROOM_UPDATE_RESET } from '../constants/roomConstants'
import Meta from '../components/Meta'

const RoomEditScreen = ({ match, history }) => {
  const roomId = match.params.id

  const [hotelName, setHotelName] = useState('')
  const [address, setAddress] = useState('')
  const [accommodationType, setAccommodationType] = useState('')
  const [comfortType, setComfortType] = useState('')
  const [rentPerDay, setRentPerDay] = useState(0)
  const [amenities, setAmenities] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [description, setDescription] = useState('')

  const histories = useHistory()

  const dispatch = useDispatch()

  const roomDetails = useSelector((state) => state.roomDetails)
  const { loading, error, room } = roomDetails

  const roomUpdate = useSelector((state) => state.roomUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = roomUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ROOM_UPDATE_RESET })
      history.push('/admin/roomlist')
    } else {
      if (!room.address || room._id !== roomId) {
        dispatch(listRoomDetails(roomId))
      } else {
        setHotelName(room.hotelName)
        setAddress(room.address)
        setAccommodationType(room.accommodationType)
        setComfortType(room.comfortType)
        setRentPerDay(room.rentPerDay)
        setImageUrls(room.imageUrls)
        setAmenities(room.amenities)
        setDescription(room.description)
      }
    }
  }, [dispatch, history, roomId, room, successUpdate])

  const roomAmenitiesHandler = (event) => {
    const selectedAmenity = event.target.value
    const arr = [...selectedAmenities]

    const repeated = arr.some((amenity) => amenity === selectedAmenity)

    if (arr.length === 0 || !repeated) {
      arr.push(selectedAmenity)
    }

    setSelectedAmenities(arr)
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const finalAmenities =
      selectedAmenities.length !== 0 ? selectedAmenities : amenities

    dispatch(
      updateRoom({
        _id: roomId,
        hotelName,
        address,
        accommodationType,
        comfortType,
        rentPerDay,
        imageUrls,
        amenities: finalAmenities,
        description,
      })
    )
  }

  const handleInputChange = (value) => {
    setImageUrls(value.split(','))
  }

  const accommodationArr = ['Single', 'Double', 'Triple', 'Extra Bed']
  const comfortArr = ['Suite', 'De Luxe', 'Duplex', 'Studio', 'Standart']
  const amenitiesArr = [
    { name: 'Location city', value: 'location_city' },
    { name: 'Cell-free wi-fi', value: 'wifi' },
    { name: 'Own bathroom', value: 'bathtub' },
    { name: 'Air conditioning', value: 'ac_unit' },
    { name: 'Family room', value: 'family_restroom' },
    { name: 'Fitness center', value: 'fitness_center' },
    { name: 'Non-smoking room', value: 'smoke_free' },
    { name: 'Bar', value: 'wine_bar' },
    { name: 'Parking', value: 'local_parking' },
    { name: 'Tea / coffee maker', value: 'coffee_maker' },
    { name: 'Facilities for disabled', value: 'accessible' },
  ]

  return (
    <>
      <Button
        className="btn btn-outline-light my-3"
        onClick={() => {
          histories.goBack()
        }}
      >
        Go Back
      </Button>
      <FormContainer>
        <h2>Edit Room</h2>
        <Meta title="Admin Edit Room" />
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="hotelName">
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Hotel name"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Accommodation Type</Form.Label>
              <Form.Control
                name="type"
                value={accommodationType}
                as="select"
                onChange={(e) => setAccommodationType(e.target.value)}
              >
                {accommodationArr.map((element, idx) => (
                  <option key={idx} value={element}>
                    {element}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="comfortType">
              <Form.Label>Comfort Type</Form.Label>
              <Form.Control
                name="comfortType"
                value={comfortType}
                as="select"
                onChange={(e) => setComfortType(e.target.value)}
              >
                {comfortArr.map((element, idx) => (
                  <option key={idx} value={element}>
                    {element}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="rentPerDay">
              <Form.Label>Rent Per Day</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rent per day"
                value={rentPerDay}
                onChange={(e) => setRentPerDay(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="amenities" className="mt-2">
              <Form.Label>
                Current amenities:&nbsp;
                {amenities.map((element) => {
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
              </Form.Label>

              {selectedAmenities.length !== 0 && (
                <>
                  <h6 className="mt-3" style={{ color: '#00b300' }}>
                    Selected amenities:
                  </h6>
                  {selectedAmenities.map((amenity) => (
                    <span
                      className="material-icons material-icons-green"
                      key={amenity}
                      title={amenity}
                    >
                      {amenity}
                    </span>
                  ))}
                </>
              )}

              <Form.Control
                name="amenity"
                as="select"
                onChange={roomAmenitiesHandler}
                multiple
              >
                {amenitiesArr.map((amenity) => (
                  <option key={amenity.name} value={amenity.value}>
                    {amenity.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="imageUrls">
              <Form.Label>Image Urls</Form.Label>
              <Form.Control
                name="imageUrls"
                placeholder="Enter urls, comma separated"
                value={imageUrls}
                onChange={(e) => handleInputChange(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                size={8}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default RoomEditScreen
