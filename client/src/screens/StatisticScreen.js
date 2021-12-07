import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Meta from '../components/Meta'
import { Bar } from 'react-chartjs-2'
import { Button, Col, Row } from 'react-bootstrap'
import { getChartData } from '../actions/bookingActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const StatisticScreen = ({ history }) => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const chartData = useSelector((state) => state.chartData)
  const { loading, error, dates, amounts } = chartData

  useEffect(() => {
    dispatch(getChartData())

    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [dispatch, history, userInfo])

  const randomRgbaArr = () => {
    const array = []
    const randomRgba = () => {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return 'rgba(' + r + ',' + g + ',' + b + ',' + 1 + ')'
    }
    for (let i = 0; i < dates.length; i++) {
      array.push(randomRgba())
    }
    return array
  }

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Payment statistic',
        fill: true,
        lineTension: 0.5,
        backgroundColor: randomRgbaArr,
        borderColor: 'rgba(0,0,0,0)',
        borderWidth: 1,
        data: amounts,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
      labels: {
        fontColor: '#00004d',
        fontSize: 13,
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: '#00004d',
            fontSize: 13,
          },
          display: true,
          gridLines: {
            display: true,
            lineWidth: 1,
            color: '#00004d',
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return value
            },
            beginAtZero: true,
            fontColor: '#00004d',
            fontSize: 13,
            padding: 2,
          },
          display: true,
          gridLines: {
            display: true,
            lineWidth: 1,
            color: '#00004d',
          },
        },
      ],
    },
  }

  return (
    <>
      <Meta title="Admin Statistic" />
      <Row className="align-items-center mb-3">
        <Col>
          <h2>Booking payment statistics</h2>
        </Col>
        <Col style={{ textAlign: 'right' }}>
          <Button
            className="btn"
            onClick={() => {
              history.goBack()
            }}
          >
            Go Back
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="justify-content-center" mb-3>
          <Col>
            <Bar data={data} options={options} height={120} type="bar" />
          </Col>
        </Row>
      )}
    </>
  )
}

export default StatisticScreen
