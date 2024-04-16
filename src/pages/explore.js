import React from "react";
import { useEffect, useState } from 'react';
import "../pages_css/explore.css";
import Navbar from "../components/Navbar/Navbar";

import Calendar from '../components/utils/calendar.js'

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Explore() {
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
        document.title = "Explore";
    }, []);

    const getArtistData = async () => {
        if (colRef) {
            try {
                const docSnapshot = await getDoc(colRef);
                if (docSnapshot.exists()) {
                    const data = { id: docSnapshot.id, ...docSnapshot.data() };
                    const postsArray = data.posts || []; // Default to an empty array if 'events' is not present
                    setArtistData(postsArray);
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
                <div className="explore">
                    <h2 className="explore-head">Explore</h2>
                </div>

                <div className="Calendar">
                    <Calendar />
                </div>

                <div className="post-section">
                    <div className="event-details">
                        {/* <h2>Past Events</h2> */}
                        <h1 className="event-list-head">Your Post&apos;s</h1>
                        <div className="post-flexbox">
                            <div className="event-list-parts">
                                {artistData.map((post, index) => (
                                    <div className="data-class" key={index}>
                                        <div className="data-img-main">
                                            <img src={post.postImageUrl} alt="displayImage" className="data-image" />
                                        </div>
                                        <div className="data-display">
                                            <h2 className="data-head">{post.postTitle}</h2>
                                            <p className="data-para">{post.postCategory}</p>
                                            <p className="para-small">{post.postDescription}</p>
                                            <p className="para-small-bold">{post.postTags}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Explore;
