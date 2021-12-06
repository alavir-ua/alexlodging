import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import LandingScreen from './screens/LandingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import NotFoundScreen from './screens/NotFoundScreen'
import HomeScreen from './screens/HomeScreen'
import BookingDetailsScreen from './screens/BookingDetailsScreen'
import BillingDetailsScreen from './screens/BillingDetailsScreen'
import BookingScreenStripe from './screens/BookingScreenStripe'
import RoomListScreen from './screens/RoomListScreen'
import UserListScreen from './screens/UserListScreen'
import BookingListScreen from './screens/BookingListScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserEditScreen from './screens/UserEditScreen'
import RoomEditScreen from './screens/RoomEditScreen'
import ChartScreen from './screens/ChartScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={LandingScreen} exact />
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} />
            <Route
              path="/details/:id/:fromDate/:toDate"
              component={BookingDetailsScreen}
              exact
            />
            <Route path="/billing" component={BillingDetailsScreen} exact />
            <Route path="/billing/:id" component={BillingDetailsScreen} exact />
            <Route path="/booking/:id" component={BookingScreenStripe} exact />

            {/*Home page*/}
            <Route path="/home" component={HomeScreen} exact />
            <Route path="/home/page/:pageNumber" component={HomeScreen} exact />
            <Route path="/home/search/:keyword" component={HomeScreen} exact />
            <Route
              path="/home/search/:keyword/page/:pageNumber"
              component={HomeScreen}
              exact
            />
            {/*Admin Users page*/}
            <Route path="/admin/userlist" component={UserListScreen} exact />
            <Route
              path="/admin/userlist/page/:pageNumber"
              component={UserListScreen}
              exact
            />
            <Route
              path="/admin/userlist/search/:keyword"
              component={UserListScreen}
              exact
            />
            <Route
              path="/admin/userlist/search/:keyword/page/:pageNumber"
              component={UserListScreen}
              exact
            />
            <Route path="/admin/user/:id/edit" component={UserEditScreen} />
            {/*Admin Rooms page*/}
            <Route path="/admin/roomlist" component={RoomListScreen} exact />
            <Route
              path="/admin/roomlist/page/:pageNumber"
              component={RoomListScreen}
              exact
            />
            <Route
              path="/admin/roomlist/search/:keyword"
              component={RoomListScreen}
              exact
            />
            <Route
              path="/admin/roomlist/search/:keyword/page/:pageNumber"
              component={RoomListScreen}
              exact
            />
            <Route path="/admin/room/:id/edit" component={RoomEditScreen} />
            {/*Admin Bookings page*/}
            <Route
              path="/admin/bookinglist"
              component={BookingListScreen}
              exact
            />
            <Route
              path="/admin/bookinglist/page/:pageNumber"
              component={BookingListScreen}
              exact
            />
            <Route
              path="/admin/bookinglist/search/:keyword"
              component={BookingListScreen}
              exact
            />
            <Route
              path="/admin/bookinglist/search/:keyword/page/:pageNumber"
              component={BookingListScreen}
              exact
            />
            <Route
              path="/admin/chart"
              component={ChartScreen}
              exact
            />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
