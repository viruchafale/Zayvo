import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <>
        <footer className="footer">
            <div className="footerContainer">
                <div className="footerLogo">
                        <h1>Zayvo</h1>
                    {/* <Link href="">SmartCompare</Link> */}
                    <p>Compare products like never before</p>
                </div>

                <div className="footerLinks">
                    <div className="linkGroup">
                        <h4>Company</h4>
                        <ul>
                        <li>
                            About
                            {/* <Link href="">About</Link> */}
                        </li>
                        <li>
                            Contact
                            {/* <Link href="">Contact</Link> */}
                        </li>
                        <li>
                            Careers
                            {/* <Link href="">Careers</Link> */}
                        </li>
                        </ul>
                    </div>

                    <div className="linkGroup">
                        <h4>Legal</h4>
                        <ul>
                        <li>
                            Privacy Policy
                            {/* <Link href="">Privacy Policy</Link> */}
                        </li>
                        <li>
                            Terms of Service
                            {/* <Link href="">Terms of Service</Link> */}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>

                {/* <div className="footerBottom">
                    <div className="container">
                    <p>&copy; {new Date().getFullYear()} SmartCompare. All rights reserved.</p>
                </div> */}
            
        </footer>
    </>
  )
}

export default Footer