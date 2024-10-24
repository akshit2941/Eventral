import React from "react";
import { useEffect, useState } from "react";
import "../pages_css/home_web.css"; // Assuming you have CSS styles in App.css
import Navbar from "../components/Navbar/Navbar";
import CreatePost from '../components/new_post/new';
import LineChartInsight from "../components/charts/LineChart";
import axios from 'axios';
import ScaleLoader from 'react-spinners/ScaleLoader';

// import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";



function Home_web() {
    const [modalOpen, setModalOpen] = useState(false);
    const [artistData, setArtistData] = useState([]);
    const [stats, setStats] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const db = getFirestore();
    const auth = getAuth();
    const colRef = userId ? doc(collection(db, 'artists'), userId) : null;


    useEffect(() => {
        document.title = "Eventral";

        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/stats');
                setStats(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        getArtistData();
        fetchData();

        return () => unsubscribe();

    }, [userId]);


    const reloadData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Simulating a reload delay of 1 second
    };

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
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
            <header className="header">
                <Navbar />
            </header>

            <div className="body-main">
                <div className="dashboard">
                    <h2>Home</h2>
                    <div className="dash-left">
                        <button className="dash-btn openModalBtn" onClick={() => {
                            setModalOpen(true);
                        }}>New Post</button>
                        {modalOpen && <CreatePost setOpenModal={setModalOpen} />}
                    </div>
                </div>

                <div className="analytics-boxes">
                    {stats && (
                        <>
                            <div className="ana-box">
                                <h2>Revenue</h2>
                                <h1>{stats['Total Revenue']}</h1>
                            </div>
                            <div className="ana-box">
                                <h2>Ticket Sold</h2>
                                <h1>{stats['Total Tickets Sold']}</h1>
                            </div>
                            <div className="ana-box">
                                <h2>Ticket Revenue</h2>
                                <h1>{stats['Ticket Revenue']}</h1>
                            </div>
                            <div className="ana-box">
                                <h2>Current Reach</h2>
                                <h1>{stats['Content Engagement']}</h1>
                            </div>
                        </>
                    )}
                </div>

                <div className="ticket-sale">
                    <h1>Ticket Sales</h1>
                    <div className="ticket-img">
                        <LineChartInsight />
                    </div>
                </div>

                <div className="event-list">
                    <h1 className="event-list-head">Your Events</h1>
                    {isLoading ? (
                        <div style={{
                            backgroundColor: 'white',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                        }}>
                            <ScaleLoader
                                size={30}
                                color={'#000000'}
                                loading={isLoading}
                                className="loading-spinner"
                            />
                        </div>
                    ) : (
                        <div className="event-flexbox">
                            <div className="event-list-parts">
                                {artistData.slice(0, 4).map((event, index) => (
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
                    )}
                    <button className="reload-button" onClick={reloadData}>
                        <img src="https://img.icons8.com/material-rounded/24/000000/refresh--v1.png" alt="Reload" style={{ width: '30px', height: '30px' }} />
                    </button>
                </div>

            </div>

            <div>
            </div>
        </div>
    );
}

export default Home_web;