import React from "react";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { Link } from "react-router-dom";

const DishesCard = (props) => {
  const { img, title, price, id } = props;

  return (
    <div className="w-full lg:w-1/4 p-5 shadow-lg rounded-lg bg-white relative">
      <div className="relative overflow-hidden rounded-xl">
        <img className="w-full h-auto rounded-xl" src={img} alt={title} />
        {/* Offer Badge */}
       
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md shadow-md">
            7% OFF
          </div>
      
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-md">
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarFill className="text-yellow-500" />
          <BsStarHalf className="text-yellow-500" />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <h3 className="font-semibold text-lg">Rs {price}</h3>
          <Link to="/">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DishesCard;
