import React from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Meta from '../components/Meta'

AOS.init({
  duration: '2000',
})

const LandingScreen = () => {
  return (
    <>
      <Meta
        style="
       main {
            background: url(https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80);
            min-height: 100vh;
            background-position: top center;
            background-attachment: fixed;
        }
    "
        title="Landing"
      />
      <div className="row justify-content-center text-center mt-5">
        <div className="col-md-9 my-auto al-landing">
          <h1 data-aos="zoom-in">Alex Lodging</h1>
          <h2 data-aos="zoom-out">"Your comfort at an affordable price"</h2>
          <Link to="/home">
            <button className="btn btn-primary mt-3">Get Started</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default LandingScreen
