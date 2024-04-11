import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import CreateEvent from '../components/newEvent/event';
import '../pages_css/event.css';

import img1 from "../images/img-1.jpg";
import img2 from "../images/img-2.jpg";
import img3 from "../images/img-3.jpg";

function EventPage() {

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Event";
    }, []);
    return (
        <div className="div-body">
            <header className='header'>
                <Navbar />
            </header>

            <div className="body-main">
                <div className="events">
                    <h2>Events</h2>

                    <div className="event-right">
                        {/* <button className="event-btn" onClick={() => {
                            setModalOpen(true);
                        }}>New Event</button>
                        {modalOpen && <CreateEvent setOpenModal={setModalOpen} />} */}
                    </div>
                </div>

                <div className="event-body">
                    <div className="event-bar">
                        <ul className="event-ul">
                            <li>Past</li>
                            <li>Upcoming</li>
                            <li>Draft</li>
                        </ul>
                    </div>
                </div>


                <div className="event-box">
                    <div className="event-center-box">

                        <div className="event-box-text">
                            <h2>You haven&apos;t created any events yet.</h2>
                        </div>
                        <div className="event-btn-area">
                            <button className="event-btn" onClick={() => {
                                setModalOpen(true);
                            }}>New Event</button>
                            {modalOpen && <CreateEvent setOpenModal={setModalOpen} />}
                        </div>
                    </div>
                </div>

                <div className="event-details">
                    <h2>Past Events</h2>
                    <div className="event-box-detail">
                        <div className="event-box-img">
                            <img src={img1} alt="" />
                        </div>
                        <div className="event-info">
                            <h3>Summer Vibes Fest</h3>
                            <p>Jun 12, 2023</p>
                        </div>
                    </div>

                    <div className="event-box-detail">
                        <div className="event-box-img">
                            <img src={img2} alt="" />
                        </div>
                        <div className="event-info">
                            <h3>Acoustic Night</h3>
                            <p>Feb 28, 2023</p>
                        </div>
                    </div>
                    <div className="event-box-detail">
                        <div className="event-box-img">
                            <img src={img3} alt="" />
                        </div>
                        <div className="event-info">
                            <h3>NYE Countdown</h3>
                            <p>Dec 31, 2022</p>
                        </div>
                    </div>
                    <div className="event-box-detail">
                        <div className="event-box-img">
                            <img src={img3} alt="" />
                        </div>
                        <div className="event-info">
                            <h3>Open Mic Night</h3>
                            <p>Sep 15, 2022</p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default EventPage;
