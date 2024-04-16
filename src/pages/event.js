import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import CreateEvent from '../components/newEvent/event';
import '../pages_css/event.css';

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function EventPage() {

    const [modalOpen, setModalOpen] = useState(false);
    const [artistData, setArtistData] = useState([]);
    const [userId, setUserId] = useState(null);

    const db = getFirestore();
    const auth = getAuth();

    const colRef = userId ? doc(collection(db, 'artists'), userId) : null;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        getArtistData();

        return () => unsubscribe();

    }, [userId]);

    useEffect(() => {
        document.title = "Event";
    }, []);

    const getArtistData = async () => {
        if (colRef) {
            try {
                const docSnapshot = await getDoc(colRef);
                if (docSnapshot.exists()) {
                    const data = { id: docSnapshot.id, ...docSnapshot.data() };
                    // Retrieve the 'events' array from the document data
                    const eventsArray = data.events || []; // Default to an empty array if 'events' is not present
                    setArtistData(eventsArray);
                } else {
                    console.error('Document does not exist');
                }
            } catch (error) {
                console.error('Error fetching artist data:', error);
            }
        } else {
            console.error('User is not authenticated');
        }
    };

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
                    {/* <h2>Past Events</h2> */}
                    <h1 className="event-list-head">All Event&apos;s</h1>
                    <div className="event-flexbox">
                        <div className="event-list-parts">
                            {artistData.map((event, index) => (
                                <div className="data-class" key={index}>
                                    <div className="data-img-main">
                                        <img src={event.eventImageUrl} alt="displayImage" className="data-image" />
                                    </div>
                                    <div className="data-display">
                                        <h2 className="data-head">{event.eventDate}</h2>
                                        <p className="data-para">{event.eventTitle}</p>
                                        <p className="para-small">{event.eventDescription}</p>
                                        <p className="para-small-bold">Rs.{event.eventPrice}</p>
                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div >
    );
}

export default EventPage;
