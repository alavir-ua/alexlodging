import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const SearchBox = ({ setSearchKeyword }) => {
  const [keyword, setKeyword] = useState('')

  const searchHandler = () => {
    setSearchKeyword(keyword)
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
