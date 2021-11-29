import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Location, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import AdminSearchBox from './AdminSearchBox'
import { logout } from '../actions/userActions'

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Alex Lodging</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {userInfo &&
            userInfo.isAdmin &&
            location.pathname.match(/\/admin\//) !== null ? (
              <Nav className="m-auto">
                <Route
                  render={({ history }) => <AdminSearchBox history={history} />}
                />
              </Nav>
            ) : (
              <Nav className="mr-auto">
                <LinkContainer to="/home">
                  <Nav.Link>
                    <i className="fas fa-home" /> Home
                  </Nav.Link>
                </LinkContainer>
                <a
                  className="nav-link"
                  href="https://github.com/alavir-ua/alexlodging.git"
                  rel="noreferrer"
                  target="_blank"
                >
                  <i className="fab fa-github" /> Github
                </a>
              </Nav>
            )}
            <Nav className="al-nav ml-auto">
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin menu" id="admin_menu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/roomlist">
                    <NavDropdown.Item>Rooms</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/bookinglist">
                    <NavDropdown.Item>Bookings</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
