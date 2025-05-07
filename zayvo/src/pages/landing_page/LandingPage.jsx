import React from 'react'
import "./LandingPage.css"
import logo from "../../Assets/logo.png"
import compare from "../../Assets/compare.jpg"

const LandingPage = () => {
  return (
    <>
        <div className='header-landing-page'>
            <h1 className='logo'><img src={logo} alt=""  className='logo-img'/>Zayvo</h1>
            <button className='login-button'>Login</button>
        </div>
        <section className='container'>
            <div className='page-text'>
                <h1>Compare Products<br/>Like Never Before</h1>
                <p>Easily compare features, prices, and ratings of products side-by-side</p>
                <button class="start-btn">Start Comparing Now</button>
            </div>
            <div className="page-image">
                <img src={compare} alt=""  />
            </div>
        </section>
    </>
  )
}

export default LandingPage

