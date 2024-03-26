import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenuUnfold, AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { CiPizza } from "react-icons/ci";
const Navbar = () => {
  const [menu, setMenu] = useState(false); // State to control mobile menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Effect to check if user is already logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Function to toggle mobile menu
  const handleChange = () => {
    setMenu(!menu);
  };

  // Function to close mobile menu
  const closeMenu = () => {
    setMenu(false);
  };

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Set isLoggedIn to false
    navigate("/"); // Redirect to home page after logout
    toast("Logged out from application!", {
      icon: "😔",
    });
  };

  return (
    <div className="fixed w-full">
      <Toaster /> {/* Toaster component for displaying toast messages */}
      <div>
        <div className="flex flex-row justify-between p-5 md:px-32 px-5 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          {/* Logo and Brand */}
          <Link to="/">
            <div className="flex flex-row items-center cursor-pointer px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors ">
              <span>
              
                <CiPizza size={32} />
              </span>
              <h1 className="text-xl font-semibold">BiteBliss</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-row items-center text-lg font-medium gap-8">
            <Link
              to="/"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Create Food
            </Link>
            <Link
              to="/about"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              About
            </Link>
            <Link
              to="/menu"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Menu
            </Link>
            <Link
              to="/manage-foods"
              className="hover:text-brightColor transition-all cursor-pointer"
            >
              Manage Foods
            </Link>

            {/* Render Logout button if user is logged in, otherwise render Register and Login buttons */}
            {isLoggedIn ? (
              <button
                className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/register">
                  <button className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors">
                    Login
                  </button>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center">
            {menu ? (
              <AiOutlineClose size={25} onClick={handleChange} />
            ) : (
              <AiOutlineMenuUnfold size={25} onClick={handleChange} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            menu ? "translate-x-0" : "-translate-x-full"
          } lg:hidden flex flex-col absolute bg-black text-white left-0 top-20 font-semibold text-2xl text-center pt-8 pb-4 gap-8 w-full h-fit transition-transform duration-300 z-50`}
        >
          <Link
            to="/"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/create"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Create Food
          </Link>
          <Link
            to="/about"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            to="/menu"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Menu
          </Link>
          <Link
            to="/manage-foods"
            className="hover:text-brightColor transition-all cursor-pointer"
            onClick={closeMenu}
          >
            Manage Foods
          </Link>

          {/* Render Logout button if user is logged in, otherwise render Register and Login buttons */}
          {isLoggedIn ? (
            <Link to="/" onClick={closeMenu}>
              <button
                onClick={handleLogout}
                className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            </Link>
          ) : (
            <>
              <Link to="/register" onClick={closeMenu}>
                <button className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors">
                  Register
                </button>
              </Link>
              <Link to="/login" onClick={closeMenu}>
                <button className="px-4 py-2  text-orange-400 border border-orange-500 rounded hover:bg-orange-600 hover:border-orange-600 hover:text-white transition-colors">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
