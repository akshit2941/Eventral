import React from "react";
import { useEffect, useState } from 'react';
import "../pages_css/explore.css";
import Navbar from "../components/Navbar/Navbar";
import ScaleLoader from 'react-spinners/ScaleLoader';
import Calendar from '../components/utils/calendar.js'

import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function Explore() {
    const [artistData, setArtistData] = useState([]);
    const [userId, setUserId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const db = getFirestore();
    const auth = getAuth();

    const colRef = userId ? doc(collection(db, 'artists'), userId) : null;

    useEffect(() => {
        document.title = "Explore";

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
                    const postsArray = data.posts || [];
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

                {/* <div className="explore-artist">
                    <h1 className="explore-artist-head">
                        Other Artist On Board!
                    </h1>
                    <div className="explore-list">
                        <div className="explore-artist-profile">
                            <p className="artist-profile-name">
                                Diaz
                            </p>
                        </div>
                    </div>

                </div> */}

                <div className="post-section">
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
                        <div className="event-details">
                            <h1 className="event-list-head">Your Posts</h1>
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
                    )}
                    <button className="reload-button" onClick={reloadData}>
                        <img src="https://img.icons8.com/icon/59872/refresh" alt="Reload" style={{ width: '30px', height: '30px' }} />
                    </button>
                </div>

            </div>

        </div>
    );
}

export default Explore;
