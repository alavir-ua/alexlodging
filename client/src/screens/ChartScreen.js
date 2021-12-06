import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Meta from '../components/Meta'

const ChartScreen = ({ history }) => {
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push('/login')
    }
  }, [userInfo])

  return (
    <>
      <h2>ChartScreen</h2>
      <Meta title="Admin Statistic" />
    </>
  )
}

export default ChartScreen
