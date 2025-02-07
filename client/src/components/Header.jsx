import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { removeUserData } from "../Redux/slices/user-slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.userData);

  const handleLogout = () => {
    dispatch(removeUserData());
    navigate("/");
  };

  return (
    <header className="flex h-[70px] items-center justify-center bg-white shadow-md border-b border-gray-200">
      <div className="mx-5 flex w-full max-w-[1550px] items-center justify-between text-gray-900">
        {/* Logo */}
        <div className="flex h-[50px] w-[120px] items-center justify-center overflow-hidden">
          <img src="/logo.png" alt="Logo" className="h-full object-contain" />
        </div>
        {/* Navigation Links */}
        <GiHamburgerMenu className="text-2xl md:hidden cursor-pointer text-blue-600" />
        <div className="hidden md:flex md:items-center md:gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>
          {isAuthenticated ? (
            <>
              <Link to="/search" className="hover:text-blue-600">
                <FaSearch className="text-xl" />
              </Link>
              <Link to="/upload" className="hover:text-blue-600">
                <MdOutlineFileUpload className="text-2xl" />
              </Link>
              <Link to="/profile">
                <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-500">
                  Profile
                </button>
              </Link>
              <button
                className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-red-400"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-500">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-green-400">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
