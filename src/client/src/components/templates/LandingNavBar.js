import React from 'react';

import logo from  "../../assets/img/logo-ct-2.png"; 

function LandingNavBar () {
    return (




<header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="main-nav">
            <a href="/" className="logo">
              <img src= {logo} alt=""/>
            </a>
            
            <ul className="nav">
              <li className="scroll-to-section"><a href="/Home" className="active">Home</a></li>
              <li className="scroll-to-section"><a href="/services">Services</a></li>
              <li className="scroll-to-section"><a href="/contact">Contact</a></li> 
              <li className="scroll-to-section"><a href="/SignIn">Sign In</a></li>
              <li className="scroll-to-section"><div className="border-first-button"><a href="/register">Register</a></div></li> 
            </ul>        
            <a className='menu-trigger'>
                <span>Menu</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  </header>


        
    );
}

export default LandingNavBar ;