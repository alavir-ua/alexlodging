import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Meta from '../components/Meta'

const NotFoundScreen = ({ history }) => {
  let location = useLocation()

  const clickHandler = (e) => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <Row>
      <Meta
        title="404"
        style="
       main {
            background: url(https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1374&q=80) top center;
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
      />
      <Col>
        <div className="not-found bs">
          <span
            style={{
              color: '#00004d',
              fontSize: '10rem',
            }}
          >
            404
          </span>
          <h2>Page {location.pathname} not found...</h2>
          <Button
            onClick={(e) => clickHandler(e)}
            style={{ marginTop: '2rem' }}
          >
            Back Home
          </Button>
        </div>
      </Col>
    </Row>
  )
}

export default NotFoundScreen
