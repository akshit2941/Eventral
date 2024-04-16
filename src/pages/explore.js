import React from "react";
import "../pages_css/explore.css";
import Navbar from "../components/Navbar/Navbar";

import Calendar from '../components/utils/calendar.js'

function Explore() {


    return (
        <div className="div-body">
            <header className="header">
                <Navbar />
            </header>

            <div className="body-main">
                <div className="explore">
                    <h2 className="explore-head">Explore</h2>
                </div>

                <div className="Calendar">
                    <Calendar />
                </div>
            </div>

        </div>
    );
}

export default Explore;
