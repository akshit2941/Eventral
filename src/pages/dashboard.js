import React from 'react';
import Navbar from '../components/Navbar';
import { useEffect } from 'react';
import '../pages_css/dashboard.css';

import charts from "../images/charts.png";
import charts_2 from "../images/chart_2.png";

function DashboardPage() {
    useEffect(() => {
        document.title = "Dashboard";
    }, []);
    return (
        <div className="div-body">
            <header className='header'>
                <Navbar />
            </header>

            <div className="body-main">
                <div className="dashboard">
                    <h2>Dashboard</h2>
                </div>

                <div className="sub-dashboard">
                    <h2>
                        Performance Overview
                    </h2>
                </div>

                <div className="dash-rev">
                    <h2>
                        Total revenue
                    </h2>
                    <h3>
                        $1,412,985.00
                    </h3>

                    <div className="rev-img">
                        <img src={charts} alt="Image 1" />
                    </div>

                </div>

                <div className="analytics-boxes">
                    <div className="ana-box">
                        <h2>Ticket sold</h2>
                        <h1>13,895</h1>
                        <p className="green">+22%</p>
                    </div>

                    <div className="ana-box">
                        <h2>Refunded tickets</h2>
                        <h1>2,000</h1>
                        <p className="green">+5%</p>
                    </div>

                    <div className="ana-box">
                        <h2>Total attendees</h2>
                        <h1>11,895</h1>
                        <p className="green">+18%</p>
                    </div>

                </div>

                <div className="rev-streams">
                    <div className="stream-header">
                        <h2>Revenue Streams</h2>
                    </div>

                    <div className="stream-tickets">
                        <h1>
                            Tickets
                        </h1>
                        <h2>
                            $1,412,985.00
                        </h2>

                    </div>

                    <div className="stream-img">
                        <img src={charts_2} alt="Image 2" />
                    </div>
                </div>

                <div className="concerts">
                    <div className="concert-head">
                        <h2>
                            Concerts
                        </h2>
                    </div>

                    <table className="table">
                        <thead>
                            <tr className="table-head">
                                <th>Event</th>
                                <th>Date</th>
                                <th>Revenue</th>
                                <th>Ticket sold</th>
                                <th>Attendees</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="table-main">
                                    Beyonce World Tour
                                </td>
                                <td>
                                    Jul 21, 2023
                                </td>
                                <td>
                                    $500,000.00
                                </td>
                                <td>
                                    5,000
                                </td>
                                <td>
                                    5,000
                                </td>
                            </tr>

                            <tr>
                                <td className="table-main">
                                    Kanye West Concert
                                </td>
                                <td>
                                    Aug 5, 2023
                                </td>
                                <td>
                                    $350,000.00
                                </td>
                                <td>
                                    3,000
                                </td>
                                <td>
                                    3,000
                                </td>
                            </tr>

                            <tr>
                                <td className="table-main">
                                    Drake Live Perfomance
                                </td>
                                <td>
                                    Sep 1, 2023
                                </td>
                                <td>
                                    $562,000.00
                                </td>
                                <td>
                                    5,620
                                </td>
                                <td>
                                    5,620
                                </td>
                            </tr>
                            <tr>
                                <td className="table-main">
                                    Arina Grande Concert
                                </td>
                                <td>
                                    Oct 10, 2023
                                </td>
                                <td>
                                    $425,000.00
                                </td>
                                <td>
                                    5,000
                                </td>
                                <td>
                                    4,500
                                </td>
                            </tr>

                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}

export default DashboardPage;
