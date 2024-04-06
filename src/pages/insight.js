import React from "react";
import { useEffect } from "react";
import "../pages_css/insight.css"; // Assuming you have CSS styles in App.css
import Navbar from "../components/Navbar/Navbar";

import insight_charts from "../images/insight-chart.png";

function Insight() {
    useEffect(() => {
        document.title = "Insight";
    }, []);
    return (
        <div className="div-body">
            <header className='header'>
                <Navbar />
            </header>

            <div className="body-main">
                <div className="insights">
                    <h2>Insights</h2>
                    <p>Peformance and engagement metrics for your posts</p>
                </div>

                <div className="insight-tab">
                    <ul className="head">
                        <li>
                            <p>Overview</p>
                        </li>
                        <li>
                            <p>Posts</p>
                        </li>
                        <li>
                            <p>Stories</p>
                        </li>
                        <li>
                            <p>Reels</p>
                        </li>
                        <li>
                            <p>Live</p>
                        </li>
                    </ul>
                </div>

                {/* <hr> */}

                <div className="insight-search">
                    <input type="text" id="searchInput" placeholder="Find a post..." />
                    <button className="search-Button">Search</button>
                </div>

                <div className="search-button-category">
                    <button className="category-btn">Last 7 days</button>
                    <button className="category-btn">Last 30 days</button>
                    <button className="category-btn">Custom date range</button>
                    <button className="category-btn">Export data</button>
                </div>

                <div className="insight-chart">
                    <div className="chart-head">
                        <h2>Total Interaction</h2>
                    </div>
                    <div className="chart-img">
                        <img src={insight_charts} alt="Image 1" />
                    </div>
                </div>

                <div className="post-performance">
                    <div className="per-header">
                        <h1>Post Performance</h1>
                    </div>

                    <div className="ana-table">
                        <table>
                            <thead>
                                <th>Type</th>
                                <th>Date</th>
                                <th>Views</th>
                                <th>Interaction</th>
                                <th>Engagement Rate</th>
                                <th>Saved</th>
                            </thead>


                            <tbody>
                                <tr>
                                    <td>Photo</td>
                                    <td>Aug 18</td>
                                    <td>5,345</td>
                                    <td>3,345</td>
                                    <td>62</td>
                                    <td>1,345</td>
                                </tr>

                                <tr>
                                    <td>Video</td>
                                    <td>Aug 14</td>
                                    <td>8,345</td>
                                    <td>6,345</td>
                                    <td>82</td>
                                    <td>2,345</td>
                                </tr>
                                <tr>
                                    <td>Photo</td>
                                    <td>Aug 10</td>
                                    <td>2,345</td>
                                    <td>1,345</td>
                                    <td>52</td>
                                    <td>545</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Insight;
