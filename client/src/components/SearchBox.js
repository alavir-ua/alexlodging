import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const setKeywordHandler = () => {
    if (keyword.trim()) {
      history.push(`/home/search/${keyword}`)
    } else {
      history.push('/home')
    }
  }

  return (
    <InputGroup className="al-search-box">
      <FormControl
        type="text"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Print Hotel name..."
      />
      <Button onClick={setKeywordHandler}>Search</Button>
    </InputGroup>
  )
}

export default SearchBox
