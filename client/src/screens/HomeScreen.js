import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import Room from '../components/Room'
import DatePicker from '../components/DatePicker'
import SideFilter from '../components/SideFilter'
import SearchBox from '../components/SearchBox'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listRooms } from '../actions/roomActions'
import moment from 'moment'

const HomeScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [filterData, setFilterData] = useState({
    accomodType: '',
    comfortType: '',
    maxCost: 1000,
  })

  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const stateRoomList = useSelector((state) => state.roomList)
  const { loading, error, rooms, page, pages } = stateRoomList

  useEffect(() => {
    dispatch(listRooms(pageNumber, keyword, fromDate, toDate, filterData))
  }, [dispatch, pageNumber, keyword, fromDate, toDate, filterData])

  const setDatesRange = (dates) => {
    if (
      dates[0] === moment(new Date()).format('YYYY-MM-DD') &&
      dates[1] === moment(new Date()).format('YYYY-MM-DD')
    ) {
      setFromDate('')
      setToDate('')
    } else {
      setFromDate(dates[0])
      setToDate(dates[1])
    }
  }

  const setFilter = (data) => {
    setFilterData(data)
  }

  return (
    <>
      <Meta
        title="Home"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1542889601-399c4f3a8402?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);
            min-height: 100vh;
            background-position: top center;
            background-repeat: no-repeat;
            background-size: auto;
            background-attachment: fixed;
        }
    "
      />
      <SideFilter setFilter={setFilter} />
      <Row className="mt-4 al-box-shadow">
        <Col md={4}>
          <DatePicker setDatesRange={setDatesRange} />
        </Col>
        <Col md={4}>
          <h3 style={{ textAlign: 'center', color: 'yellow' }}>
            Best London Apartments
          </h3>
        </Col>
        <Col md={4}>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : rooms.length !== 0 ? (
        <>
          <Row className="mb-4">
            {rooms.map((room) => (
              <Room
                room={room}
                fromdate={fromDate}
                todate={toDate}
                key={room._id}
              />
            ))}
          </Row>
          <Paginate
            isAdmin={false}
            type="rooms"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      ) : (
        <Message variant="danger">
          Ouch! There are no rooms for this request ...
        </Message>
      )}
    </>
  )
}

export default HomeScreen
