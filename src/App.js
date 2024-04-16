import React, { useEffect, useState } from 'react';
import './App.css';

import Event from './pages/event';
import Dashboard from './pages/dashboard';
import Home_web from './pages/home_web';
import Insight from './pages/insight';
import Explore from './pages/explore';

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import { AuthProvider } from "./components/contexts/authContext";
import { useRoutes } from "react-router-dom";

import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';


function App() {

  const [loading, setLoading] = useState(false);

  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: '/event',
      element: <Event />,
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
    },
    {
      path: '/explore',
      element: <Explore />,
    },
    {
      path: '/home_web',
      element: <Home_web />,
    },
    {
      path: '/insight',
      element: <Insight />,
    },
  ];

  let routesElement = useRoutes(routesArray);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }, []);

  return (
    loading ? (
      <div style={{
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
      }}>
        <ClimbingBoxLoader
          size={30}
          color={'#000000'}
          loading={loading}
          className="loading-spinner"
        />
      </div>
    ) : (
      <AuthProvider>
        <div className="w-full h-screen flex flex-col">{routesElement}</div>
      </AuthProvider>
    )
  );

}


export default App

