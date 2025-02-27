import { useState } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import logo from "../src/assets/house.png";
import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoggedIn = useSelector((state) => state.Itemslice.isUseractive);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfile = () => navigate("/profile");
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <nav className="bg-gray-700 shadow-md fixed w-full top-0 z-50 rounded-b-3xl p-4">
      <div className="absolute top-0 left-0 w-full h-3 bg-gray-900 rounded-t-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Top Section - Logo & Mobile Controls */}
          
          <div className="w-full flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img src={logo} alt="UrbanKey" className="h-16 w-16" />
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                Urban <span className="text-blue-300">Key</span>
              </h1>
            </Link>

            <div className="flex items-center gap-4 md:hidden">
              <button
                className="text-white"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
              </button>
              {isLoggedIn && (
                <FaRegUserCircle
                  className="h-8 w-8 text-white"
                  onClick={handleProfile}
                />
              )}
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <form
            onSubmit={handleSearch}
            className="w-full md:hidden bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-gray-300"
              />
              <button type="submit" className="text-white hover:text-blue-300">
                <FaSearch />
              </button>
            </div>
          </form>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-2xl mx-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 transition-all hover:bg-white/20"
          >
            <div className="flex items-center w-[8vw] gap-3">
              <FaSearch className="text-gray-300" />
              <input
                type="text"
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white focus:ring-0 placeholder-gray-300"
              />
            </div>
          </form>

          {/* Navigation Links & Profile */}
          <div
  className={`${
    isOpen ? "flex" : "hidden"
  } md:flex flex-col md:flex-row items-center sm:gap-[2vh] md:gap-6 lg:gap-17 text-white w-full md:w-auto`} // 
>
  <NavLink
    to="/"
    className={({ isActive }) =>
      `hover:text-blue-300 text-lg ${isActive ? "text-blue-300 font-semibold" : ""}`
    }
  >
    🏡 Home
  </NavLink>
  <NavLink
    to="/addhome"
    className={({ isActive }) =>
      `hover:text-blue-300 text-lg ${isActive ? "text-blue-300 font-semibold" : ""}`
    }
  >
    ➕ Add Home
  </NavLink>
  <NavLink
    to="/fetchquery"
    className={({ isActive }) =>
      `hover:text-blue-300 text-lg ${isActive ? "text-blue-300 font-semibold" : ""}`
    }
  >
    🗯️ My Queries
  </NavLink>

  <NavLink
    to="/userhomes"
    className={({ isActive }) =>
      `hover:text-blue-300 text-lg ${isActive ? "text-blue-300 font-semibold" : ""}`
    }
  >
    📃 My Listings
  </NavLink>
 
  <Link
    to="/favourites"
    className="hover:text-blue-300 text-lg"
  >
    ❤️ Favourites
  </Link>

            {/* Profile Section - Desktop */}
            <div className="hidden md:flex items-center gap-4 bg-gray-800 p-3 rounded-2xl hover:bg-gray-600 transition duration-300">
              {isLoggedIn ? (
                <FaRegUserCircle
                  className="cursor-pointer h-8 w-8 text-white"
                  onClick={handleProfile}
                />
              ) : (
                <>
                  <Link to="/login" className="hover:text-blue-300 text-lg">
                    Login
                  </Link>
                  <Link to="/register" className="hover:text-blue-300 text-lg">
                    Register
                  </Link>
                </>
              )}
              
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-3 bg-gray-900 rounded-b-3xl"></div>
    </nav>
  );
};

export default Navbar;