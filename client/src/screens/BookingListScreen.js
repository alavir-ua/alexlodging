import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listBookings } from '../actions/bookingActions'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'
import moment from 'moment'
import 'moment/locale/en-gb'

const BookingListScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const bookingList = useSelector((state) => state.bookingList)
  const { loading, error, bookings, page, pages, pageSize } = bookingList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listBookings(keyword, pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, keyword, pageNumber])

  return (
    <>
      <h2>Bookings</h2>
      <Meta title="Admin Bookings" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID(shortened)</th>
                <th>USER</th>
                <th>ROOM</th>
                <th>FROM</th>
                <th>TO</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{pageSize * (pageNumber - 1) + index + 1}</td>
                  <td>{booking._id.substring(12)}</td>
                  <td>{booking.user.name}</td>
                  <td>
                    {booking.room.hotelName},{booking.room.address}
                  </td>
                  <td
                    style={
                      moment
                        .duration(
                          moment(booking.toDate, 'YYYY-MM-DD').diff(
                            moment(moment().format('YYYY-MM-DD'))
                          )
                        )
                        .asDays() < 1
                        ? { color: '#b30000' }
                        : { color: 'green' }
                    }
                  >
                    {booking.fromDate}
                  </td>
                  <td
                    style={
                      moment
                        .duration(
                          moment(booking.toDate, 'YYYY-MM-DD').diff(
                            moment(moment().format('YYYY-MM-DD'))
                          )
                        )
                        .asDays() < 1
                        ? { color: '#b30000' }
                        : { color: 'green' }
                    }
                  >
                    {booking.toDate}
                  </td>
                  <td>${booking.totalAmount}</td>
                  <td>
                    {booking.isPaid ? (
                      <i className="fas fa-check" style={{ color: 'green' }} />
                    ) : (
                      <i
                        className="fas fa-times"
                        style={{ color: '#b30000' }}
                      />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/booking/${booking._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm btn-red"
                      /*onClick={() => deleteHandler(user._id, user.name)}*/
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            isAdmin={true}
            type="bookings"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default BookingListScreen
