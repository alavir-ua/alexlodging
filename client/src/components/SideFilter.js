import React, { useState } from 'react'
import { Sidenav, Toggle } from 'rsuite'
import { Form, Button } from 'react-bootstrap'
import RangeSlider from 'react-bootstrap-range-slider'

const SideFilter = ({ setFilter }) => {
  const [expanded, setExpanded] = useState(false)
  const [accomodType, setAccomodType] = useState('')
  const [comfortType, setComfortType] = useState('')
  const [maxCost, setMaxCost] = useState(1000)

  const accommodation = ['All', 'Single', 'Double', 'Triple', 'Extra Bed']
  const comfort = ['All', 'Suite', 'De Luxe', 'Duplex', 'Studio', 'Standart']

  const submitHandler = (e) => {
    e.preventDefault()
    setExpanded(false)
  }

  const resetValues = () => {
    setAccomodType('All')
    setComfortType('All')
    setMaxCost(1000)
    setFilterData()
    document.location.href = '/home'
  }

  const setFilterData = () => {
    const accomod_type = accomodType === 'All' ? '' : accomodType
    const comfort_type = comfortType === 'All' ? '' : comfortType

    setFilter({
      accomodType: accomod_type,
      comfortType: comfort_type,
      maxCost,
    })
  }

  return (
    <div className="al-side-filter">
      <Toggle
        onChange={setExpanded}
        checked={expanded}
        checkedChildren="Close Filter"
        unCheckedChildren="Open Filter"
      />
      <Sidenav expanded={expanded}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="accomodType">
            <Form.Label>Accommodation type</Form.Label>
            <Form.Control
              name="accomodType"
              value={accomodType}
              as="select"
              onChange={(e) => setAccomodType(e.target.value)}
            >
              {accommodation.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <hr />
          <Form.Group controlId="comfortType">
            <Form.Label>Comfort type</Form.Label>
            <Form.Control
              name="comfortType"
              value={comfortType}
              as="select"
              onChange={(e) => setComfortType(e.target.value)}
            >
              {comfort.map((type, idx) => (
                <option key={idx} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Max const per day</Form.Label>
            <br />
            <RangeSlider
              min={200}
              max={1000}
              step={10}
              value={maxCost}
              onChange={(e) => setMaxCost(e.target.value)}
            />
          </Form.Group>
          <hr />
          <Button type="submit" onClick={setFilterData}>
            Search
          </Button>
          <Button style={{ marginLeft: '5px' }} onClick={resetValues}>
            Reset
          </Button>
        </Form>
      </Sidenav>
    </div>
  )
}

export default SideFilter
