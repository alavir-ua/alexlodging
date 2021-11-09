import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from 'components/Header'
import Footer from 'components/Footer'
import LandingScreen from 'screens/LandingScreen'
import LoginScreen from 'screens/LoginScreen'
import RegisterScreen from 'screens/RegisterScreen'
import NotFoundScreen from 'screens/NotFoundScreen'
import HomeScreen from 'screens/HomeScreen'
import BookingDetailsScreen from 'screens/BookingDetailsScreen'
import BillingDetailsScreen from 'screens/BillingDetailsScreen'
import BookingPaymentScreen from 'screens/BookingPaymentScreen'

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
            <Route path="/home" component={HomeScreen} exact />
            <Route
              path="/details/:id/:fromDate/:toDate"
              component={BookingDetailsScreen}
              exact
            />
            <Route path="/billing" component={BillingDetailsScreen} exact />
            <Route
              path="/booking/:id/stripe"
              component={BookingPaymentScreen}
              exact
            />
            <Route path="/home/search/:keyword" component={HomeScreen} exact />
            <Route path="/home/page/:pageNumber" component={HomeScreen} exact />
            <Route
              path="/home/search/:keyword/page/:pageNumber"
              component={HomeScreen}
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
