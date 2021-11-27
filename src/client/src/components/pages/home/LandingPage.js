import React from 'react';

import LandingNavBar from '../../templates/LandingNavBar';
import "../../../assets/css/landing-page/fontawesome.css"
import "../../../assets/css/landing-page/templatemo-digimedia-v3.css" ; 
import 'bootstrap/dist/css/bootstrap.min.css';

import mainImg from "../../../assets/img/undraw_journey_lwlj.svg" ;



class LandingPage extends React.Component {
  
    render() {
      return (

        <>
            <LandingNavBar/>

            <div className="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
                <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-6 align-self-center">
                        <div className="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                            <div className="row">
                            <div className="col-lg-12">
                                <h6>GUC Air</h6>
                                <h2>Make Travel Easy</h2>
                                <p>Explore The world with our Amazing service and best prices</p>
                            </div>
                            <div className="col-lg-12">
                                <div className="border-first-button scroll-to-section">
                                <a href="/home">Book Now</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                            <img src= {mainImg} alt=""/>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>

        </>  
      
     )
    };
  }
  
  export default LandingPage ;