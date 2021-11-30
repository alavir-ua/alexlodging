import React, { useEffect, useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const AdminSearchBox = ({ history }) => {
  const location = useLocation()
  const [keyword, setKeyword] = useState('')
  const [placeholder, setPlaceholder] = useState('')

  useEffect(() => {
    if (location.pathname.match(/\/admin\/userlist/) !== null) {
      setPlaceholder('Search Users...')
    } else if (location.pathname.match(/\/admin\/roomlist/) !== null) {
      setPlaceholder('Search Rooms...')
    } else {
      setPlaceholder('id, user name, hotel name...')
    }
  }, [location.pathname])

  const setKeywordHandler = () => {
    if (keyword.trim()) {
      if (location.pathname.match(/\/admin\/roomlist/) !== null) {
        history.push(`/admin/roomlist/search/${keyword}`)
      } else if (location.pathname.match(/\/admin\/userlist/) !== null) {
        history.push(`/admin/userlist/search/${keyword}`)
      } else {
        history.push(`/admin/bookinglist/search/${keyword}`)
      }
    } else {
      if (location.pathname.match(/\/admin\/roomlist/) !== null) {
        history.push('/admin/roomlist')
      } else if (location.pathname.match(/\/admin\/userlist/) !== null) {
        history.push('/admin/userlist')
      } else if (location.pathname.match(/\/admin\/bookinglist/) !== null) {
        history.push('/admin/bookinglist')
      }
    }
  }

  return (
    <InputGroup>
      <FormControl
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder={placeholder}
        className="al-admin-search_input"
      />
      <Button
        onClick={setKeywordHandler}
        variant="outline-success"
        className="p-2"
      >
        Search
      </Button>
    </InputGroup>
  )
}

export default AdminSearchBox
