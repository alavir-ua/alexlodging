import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Room from '../components/Room'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import moment from 'moment'
import { listRooms } from '../actions/roomActions'
import { DateRangePicker } from 'rsuite'

const HomeScreen = ({ match }) => {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const stateRoomList = useSelector((state) => state.roomList)
  const { loading, error, rooms, page, pages } = stateRoomList

  useEffect(() => {
    dispatch(listRooms(pageNumber, fromDate, toDate))
  }, [dispatch, pageNumber, fromDate, toDate])

  const datesRangeSet = (dates) => {
    setFromDate(moment(dates[0]).format('YYYY-MM-DD'))
    setToDate(moment(dates[1]).format('YYYY-MM-DD'))
  }

  const styles = {
    width: 'auto',
    display: 'block',
    marginBottom: 10,
  }
  const { beforeToday } = DateRangePicker

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
      <Row className="mt-4">
        <Col md={3}>
          <DateRangePicker
            size="lg"
            format="yyyy-MM-dd"
            disabledDate={beforeToday()}
            onChange={datesRangeSet}
            placeholder="Select Date Range"
            style={styles}
            ranges={[]}
          />
        </Col>
        <Col></Col>
        <Col></Col>
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
          <Paginate pages={pages} page={page} />
        </>
      )}
    </>
  )
}

export default HomeScreen
