import React, { useEffect, useState } from 'react';
import './admin.css'
import Navbar from '../components/Navbar/Navbar';
import { getFirestore, collection, getDocs, doc, setDoc } from "firebase/firestore";
import DefaultEventral from '../images/DefaultEventral.png';
// import { data } from 'autoprefixer';

function AdminPage() {
    const [artistData, setArtistData] = useState([]);
    const [UserData, setUserData] = useState([]);
    // const favouriteArtists = UserData.flatMap((user) => user['Following'] || []);
    // const requestedArtists = UserData.flatMap((user) => user['Requested'] || []);

    const [followingCounts, setFollowingCounts] = useState([]);

    const db = getFirestore();
    const colRef = collection(db, 'artists');
    const colRefUser = collection(db, 'users');



    const getArtistData = async () => {
        try {
            const querySnapshot = await getDocs(colRef);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setArtistData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getUserData = async () => {
        try {
            const querySnapshot = await getDocs(colRefUser);
            const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setUserData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const processFollowingData = async (userData) => {
        try {
            userData.forEach(user => {
                console.log("Following:", user.Following);
            });

            const allFollowing = userData.flatMap(user => user.Following || []);

            console.log("Combined Following data with duplicates:", allFollowing);

            const uniqueFollowing = Array.from(new Set(allFollowing));

            console.log("Combined Following data without duplicates:", uniqueFollowing);

            const countMap = allFollowing.reduce((acc, curr) => {
                acc[curr] = (acc[curr] || 0) + 1;
                return acc;
            }, {});

            const countArray = Object.entries(countMap).map(([element, count]) => ({
                element,
                count
            }));

            console.log("Element counts:", countArray);


            // Transfer countArray data to Firestore
            const countCollectionRef = collection(db, 'FollowerData');
            const docRef = doc(countCollectionRef);
            await setDoc(docRef, {
                data: countArray
            });

            setFollowingCounts(countArray);

            return countArray;
        } catch (error) {
            console.error('Error processing following data:', error);
        }
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                await getArtistData();
                await getUserData();

                await processFollowingData(UserData);


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <div className="div-body">
                <header className='header'>
                    <Navbar />
                </header>
            </div>


            <div className="body-main">
                <div className="Heading">
                    <h1 className="head-title">
                        Good Morning, Admin
                    </h1>
                    <p className="para-head">
                        Manage users data and preferences
                    </p>
                    <button className="settings">
                        User Settings
                    </button>
                    <button className="settings margin">
                        Artist Settings
                    </button>
                </div>

                <div className="users">
                    <h1 className="user-head">
                        Your Users
                    </h1>


                    <div className='user-group'>
                        {UserData.map((user, index) => (
                            <div className="user-data" key={index}>
                                <p className="user-body"><img src={user.photoUrl || DefaultEventral} alt="Artist" width="100" height="100" style={{ borderRadius: '50px', width: '125px' }} /></p>
                                <h1 className="user-title">{user.displayName}</h1>
                                <p className="user-body">{user.email}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-grey">
                        See More
                    </p>

                </div>

                <div className="artists">
                    <div className="artist-main">
                        <h1 className="artist-head">
                            Your Artists
                        </h1>
                    </div>

                    <div className='artist-body'>
                        {artistData.map((artist, index) => (
                            <div className="artist-data" key={index}>
                                <h1 className="artist-title">{artist.displayName}</h1>
                                <p className="user-body"><img src={artist.photoUrl || DefaultEventral} alt="Artist" width="100" height="100" style={{ borderRadius: '50px', width: '125px' }} /></p>
                                <p className="artist-para">{artist.email}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-grey">
                        See More
                    </p>
                </div>

                <div className='artists'>
                    <h1 className="user-head">
                        Artist On The Board!
                    </h1>
                    <div className='artist-follower-data-div'>
                        <p className='follower-main'>
                            {followingCounts.map(({ element, count }) => (
                                <p className='follower-para' key={element}>{`${element}: ${count}`}</p>
                            ))}
                        </p>
                        See More
                    </div>

                </div>

                <div className="events">
                    <div className="event-header">
                        <h1 className="event-head">
                            Manage Events
                        </h1>
                    </div>
                    <div className="event-group">
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
            </div >

        </>
    );
}

export default AdminPage;