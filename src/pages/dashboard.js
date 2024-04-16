import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import '../pages_css/dashboard.css';
import axios from 'axios';

import LineChartInsight from "../components/charts/LineChartDash";
import BarChartInsight from '../components/charts/BarChart';



function DashboardPage() {

    const [stats, setStats] = useState(null);
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/stats');
                setStats(response.data);
                console.log(response.data); // Print data in console
                const lastFiveConcerts = response.data['Last 5 Concerts'];

                const [concert1, concert2, concert3, concert4, concert5] = lastFiveConcerts;

                // Printing data of each concert
                console.log("Concert 1:", concert1);
                console.log("Concert 2:", concert2);
                console.log("Concert 3:", concert3);
                console.log("Concert 4:", concert4);
                console.log("Concert 5:", concert5);

                setConcerts(lastFiveConcerts);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchData();
    }, []);


    // const firstConcert = stats['Last 5 Concerts'][0];
    // console.log(data)

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
                    {stats && (
                        <>
                            <h2>
                                Total revenue
                            </h2>
                            <h3>
                                {stats['Ticket Revenue']}
                            </h3>
                        </>
                    )}
                    <div className="rev-img">
                        <LineChartInsight />
                    </div>

                </div>

                <div className="analytics-boxes">
                    {stats && (
                        <>
                            <div className="ana-box">
                                <h2>Ticket sold</h2>
                                <h1>{stats['Total Tickets Sold']}</h1>
                                <p className="green">+22%</p>
                            </div>
                            <div className="ana-box">
                                <h2>Refunded tickets</h2>
                                <h1>{stats['Total Refunded Tickets']}</h1>
                                <p className="red">+5%</p>
                            </div>
                            <div className="ana-box">
                                <h2>Total attendees</h2>
                                <h1>{stats['Total Attendees']}</h1>
                                <p className="green">+18%</p>
                            </div>
                        </>
                    )}

                </div>

                <div className="rev-streams">
                    <div className="stream-header">
                        <h2>Revenue Streams</h2>
                    </div>

                    <div className="stream-tickets">
                        {stats && (
                            <>
                                <h1>
                                    Tickets
                                </h1>
                                <h2>
                                    {stats['Total Revenue']}
                                </h2>
                            </>
                        )}
                    </div>

                    <div className="stream-img">
                        <BarChartInsight />
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
                            {concerts.map((concert, index) => (
                                <tr key={index}>
                                    <td className="table-main">
                                        {concert['Concert Name']}
                                    </td>
                                    <td>
                                        {concert.Date}
                                    </td>
                                    <td>
                                        {concert.Revenue}
                                    </td>
                                    <td>
                                        {concert['Tickets Sold']}

                                    </td>
                                    <td>
                                        {concert.Attended}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    );
}


export default DashboardPage;
