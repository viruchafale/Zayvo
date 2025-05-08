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
        <section className='featureSection'>
            <div className='featureContainer'>
                <h2 className='text-center'>Why Choose Zayvo?</h2>
                <div className='featureGrid'>
                    <div className="featureCard">
                        <div className="featureIcon">🔍</div>
                        <h3>Comprehensive Search</h3>
                        <p>Search across multiple e-commerce platforms with a single click</p>
                    </div>
                    <div className="featureCard">
                        <div className="featureIcon">📊</div>
                        <h3>Side-by-Side Comparison</h3>
                        <p>Compare product features, prices, and ratings in a clear format</p>
                    </div>
                    <div className="featureCard">
                        <div className="featureIcon">💰</div>
                        <h3>Find the Best Deals</h3>
                        <p>Easily spot the best prices and offers across different sites</p>
                    </div>
                    <div className="featureCard">
                        <div className="featureIcon">⏱️</div>
                        <h3>Save Time</h3>
                        <p>No more switching between tabs to compare products</p>
                    </div>
                </div>
            </div>

        </section>
        <section className="howItWorks">
            <div className="howItWorksContainer">
            <h2 className="text-center">How It Works</h2>
            <div className="stepsContainer">
                <div className="step">
                    <div className="stepNumber">1</div>
                    <h3>Search for a Product</h3>
                    <p>Enter keywords for the product you're looking for</p>
                </div>
                <div className="step">
                    <div className="stepNumber">2</div>
                    <h3>Select Items to Compare</h3>
                    <p>Choose multiple products from the search results</p>
                </div>
                <div className="step">
                    <div className="stepNumber">3</div>
                    <h3>View Detailed Comparison</h3>
                    <p>See all the details side by side and make an informed decision</p>
                </div>
            </div>
            </div>
      </section>
      

    </>
  )
}

export default LandingPage

