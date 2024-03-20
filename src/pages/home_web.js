import React from "react";
import { useEffect } from "react";
import "../pages_css/home_web.css"; // Assuming you have CSS styles in App.css
import Navbar from "../components/Navbar/Navbar";

import img1 from "../images/img-1.jpg";
import img2 from "../images/img-2.jpg";
import img3 from "../images/img-3.jpg";
import chart from "../images/chart.png";

function Home_web() {
    useEffect(() => {
        document.title = "Eventral";
    }, []);

    return (
        <div className="div-body">
            <header className="header">
                <Navbar />
            </header>

            <div className="body-main">
                <div className="dashboard">
                    <h2>Home</h2>
                    <div className="dash-left">
                        <button className="dash-btn">New</button>
                    </div>
                </div>

                <div className="analytics-boxes">
                    <div className="ana-box">
                        <h2>Revenue</h2>
                        <h1>$2.3M</h1>
                    </div>
                    <div className="ana-box">
                        <h2>Ticket Sold</h2>
                        <h1>19,000</h1>
                    </div>
                    <div className="ana-box">
                        <h2>Ticket Revenue</h2>
                        <h1>$1.9M</h1>
                    </div>
                    <div className="ana-box">
                        <h2>Current Reach</h2>
                        <h1>13,000</h1>
                    </div>
                </div>

                <div className="ticket-sale">
                    <h1>Ticket Sales</h1>
                    <div className="ticket-img">
                        <img src={chart} alt="" />
                    </div>
                </div>

                <div className="event-list">
                    <h1>Event Analytics</h1>
                    <div className="event-list-parts">
                        <div className="event-name">
                            <div className="event-img">
                                <img src={img1} alt="" />
                            </div>
                            <div className="event-details">
                                <h3>Spring Music Festival</h3>
                                <p>Feb 21 - Apr 21</p>
                            </div>
                            <p>$2.3M</p>
                        </div>
                        <div className="event-name">
                            <div className="event-img">
                                <img src={img2} alt="" />
                            </div>
                            <div className="event-details">
                                <h3>Summer Music Festival</h3>
                                <p>Feb 21 - Apr 21</p>
                            </div>
                            <p>$2.3M</p>
                        </div>
                        <div className="event-name">
                            <div className="event-img">
                                <img src={img3} alt="" />
                            </div>
                            <div className="event-details">
                                <h3>Fall Music Festival</h3>
                                <p>Feb 21 - Apr 21</p>
                            </div>
                            <p>$2.3M</p>
                        </div>
                        <div className="event-rev">
                            {/* Empty div, you can add content here */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home_web;
