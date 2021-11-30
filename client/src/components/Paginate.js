import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
  id = '',
  isAdmin,
  type = '',
  pages,
  page,
  keyword = '',
}) => {
  const link = (x, type, id) => {
    if (type === 'rooms') {
      if (isAdmin) {
        if (keyword) {
          return `/admin/roomlist/search/${keyword}`
        } else {
          return `/admin/roomlist/page/${x + 1}`
        }
      } else {
        if (keyword) {
          return `/home/search/${keyword}/page/${x + 1}`
        } else {
          return `/home/page/${x + 1}`
        }
      }
    } else if (type === 'users') {
      if (isAdmin) {
        if (keyword) {
          return `/admin/userlist/search/${keyword}`
        } else {
          return `/admin/userlist/page/${x + 1}`
        }
      }
    } else if (type === 'bookings') {
      if (isAdmin) {
        if (keyword) {
          return `/admin/bookinglist/search/${keyword}/page/${x + 1}`
        } else {
          return `/admin/bookinglist/page/${x + 1}`
        }
      }
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer key={x + 1} to={link(x, type, id)}>
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
