import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Hero = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="bg-unsplashBgImage relative flex h-screen items-center justify-center bg-cover bg-center">
      <div className="absolute inset-0 bg-black bg-opacity-60" /> {/* Lighter dark overlay */}
      <div className="relative z-10 w-full max-w-3xl px-4 text-center text-white">
        <h1 className="text-4xl font-extrabold md:text-5xl text-shadow-md font-poppins">
          FIND MY NOTES
        </h1>
        <p className="mt-5 text-lg md:text-xl font-light leading-relaxed text-gray-300 font-roboto">
          Welcome to Find My Notes – where students unite for effortless
          organization, access, and sharing of PDF notes. Say goodbye to
          scattered notebooks; streamline your study routine and embark on a
          journey to academic excellence. Simplify your student life, make your
          notes work for you – discover a new era of innovation, start today.
        </p>
        <div className="mt-8">
          <div className="flex items-center justify-center gap-6">
            {isAuthenticated ? (
              <Link to="/search">
                <button className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white border border-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                  Get Started
                </button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 border border-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 border border-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
