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
import BookingScreen from './screens/BookingScreen'

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
              path="/booking/:roomid/:fromdate/:todate"
              component={BookingScreen}
              exact
            />
            <Route path="/home/page/:pageNumber" component={HomeScreen} exact />
            <Route component={NotFoundScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
