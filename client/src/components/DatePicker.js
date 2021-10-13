import React from 'react'
import moment from 'moment'
import { DateRangePicker } from 'rsuite'
const { beforeToday } = DateRangePicker

const DatePicker = ({ setDatesRange }) => {
  const styles = {
    width: 'auto',
    display: 'block',
  }

  const setDates = (data) => {
    setDatesRange([
      moment(data[0]).format('YYYY-MM-DD'),
      moment(data[1]).format('YYYY-MM-DD'),
    ])
  }

  return (
    <DateRangePicker
      size="lg"
      format="yyyy-MM-dd"
      disabledDate={beforeToday()}
      onChange={setDates}
      placeholder="Select Date Range"
      style={styles}
      ranges={[]}
    />
  )
}

export default DatePicker
