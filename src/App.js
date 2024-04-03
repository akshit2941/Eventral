import React from 'react';
import './index.css';

import Event from './pages/event';
import Dashboard from './pages/dashboard';
import Home_web from './pages/home_web';
import Insight from './pages/insight';

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import { AuthProvider } from "./components/contexts/authContext";
import { useRoutes } from "react-router-dom";


function App() {
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
      path: '/home_web',
      element: <Home_web />,
    },
    {
      path: '/insight',
      element: <Insight />,
    },
  ];

  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>

      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App

