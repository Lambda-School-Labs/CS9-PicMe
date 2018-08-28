import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './css/AboutUs.css';

class AboutUs extends Component {


    render() {
        return (
            <div className="container">
                <h1 className="about-us-header">About PicMe</h1>
                <h3 className="about-us-sub"> Built by a team of 5 software engineers, over the course of 4 weeks.</h3>
                <p className="about-us-p"> PicMe is a unique social media image sharing 
                    platform. Browse your friends images and see if 
                    you got tagged, post your own images, tag your friends, 
                    and share some awesome experiences! Thank you for stopping 
                    by, and taking part! 
                <br/>
                </p>
                <div>
                <h6 className="about-us-h6">
                    - PicMe Team
                </h6>
                <div className="about-us-home-button">
                    <Link to="/"><button className="back-home-button"> Back Home </button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutUs;