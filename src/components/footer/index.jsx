import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

const Footer = () => {
  const { userLoggedIn } = useAuth();
  const location = useLocation();

  const shouldShowButtons = !["/login", "/register"].includes(
    location.pathname
  );

  return shouldShowButtons ? (
    <div className="footer-container relative">
      <div className="fixed bottom-0 left-0 w-full flex justify-center items-center p-4 bg-white border-t border-gray-200">
        {userLoggedIn ? (
          <button
            onClick={doSignOut}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Logout
          </button>
        ) : (
          <>
            {/* <Link to={"/login"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                Login
              </button>
            </Link>
            <Link to={"/register"}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-300">
                Register New Account
              </button>
            </Link> */}
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Footer;
