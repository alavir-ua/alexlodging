import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import { listUsers, deleteUser } from '../actions/userActions'
import Meta from '../components/Meta'
import moment from 'moment'
import 'moment/locale/en-gb'

const UserListScreen = ({ history, match }) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages, pageSize } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(keyword, pageNumber))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber, keyword])

  const deleteHandler = (id, name) => {
    if (window.confirm(`Really delete the ${name}'s profile?`)) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h2>Users</h2>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title="Admin Users" />
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>REGISTERED</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{pageSize * (pageNumber - 1) + index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a className="al-admin-link" href={`mailto:${user.email}`}>
                      {user.email}
                    </a>
                  </td>
                  <td>{moment(user.createdAt).format('LL')}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{ color: 'green' }} />
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm btn-red"
                      onClick={() => deleteHandler(user._id, user.name)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            isAdmin={true}
            type="users"
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default UserListScreen
