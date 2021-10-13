import React, { useState } from 'react'
import { InputGroup, FormControl, Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const searchHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/home')
    }
  }

  return (
    <InputGroup className="al-search-box">
      <FormControl
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Accommodation..."
      />
      <Button onClick={searchHandler}>Search</Button>
    </InputGroup>
  )
}

export default SearchBox
