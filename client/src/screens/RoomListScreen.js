import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Meta from '../components/Meta'

const RoomListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [dispatch, userInfo])

  return (
    <>
      <Meta
        title="Admin Rooms"
        style="
       main {
            background: #FFFFFF;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      <Row className="mt-4 al-box-shadow">
        <Col md={12}>
          <h1>RoomListScreen for Admin</h1>
        </Col>
      </Row>
    </>
  )
}

export default RoomListScreen
