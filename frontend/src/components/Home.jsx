import React from "react";
import backgroundImage from "../assets/img/hero.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 bg-cover bg-center bg-no-repeat bg-gradient-to-r from-gray-900 to-gray-700 text-gray-800"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-4xl text-center">
        <h1 className="text-4xl lg:text-6xl font-semibold mb-6 text-white">
          Elevate Your Culinary Experience
        </h1>
        <p className="text-lg lg:text-xl mb-8 text-white">
          Indulge in exquisite flavors and delightful dishes delivered right to
          your doorstep.
        </p>
        <Link to="/menu">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
            Order now 🛒🍔🤤
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
