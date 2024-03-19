import React from 'react';
import './index.css';

import Event from './pages/event';
import Dashboard from './pages/dashboard';
import Home_web from './pages/home_web';

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";

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
      path: "/home",
      element: <Home />,
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
  ];

  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App

