import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Route } from 'react-router-dom'
import Room from '../components/Room'
import DatePicker from '../components/DatePicker'
import SearchBox from '../components/SearchBox'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import { listRooms } from '../actions/roomActions'

const HomeScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const pageNumber = match.params.pageNumber || 1
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const stateRoomList = useSelector((state) => state.roomList)
  const { loading, error, rooms, page, pages } = stateRoomList

  useEffect(() => {
    dispatch(listRooms(pageNumber, keyword, fromDate, toDate))
  }, [dispatch, pageNumber, keyword, fromDate, toDate])

  const setDatesRange = (dates) => {
    setFromDate(dates[0])
    setToDate(dates[1])
  }

  return (
    <>
      <Meta
        title="Home"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80) top center;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      <Row className="mt-4 al-box-shadow">
        <Col md={4}>
          <DatePicker setDatesRange={setDatesRange} />
        </Col>
        <Col md={4}>
          <Route render={({ history }) => <SearchBox history={history} />} />
        </Col>
        <Col md={4}></Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default HomeScreen
