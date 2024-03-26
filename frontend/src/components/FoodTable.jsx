import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TableView from "./TableView";
import toast, { Toaster } from "react-hot-toast";

const FoodTable = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          "https://bitebliss-backend-ecom-api.onrender.com/api/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const data = await response.json();
        setMenuItems(data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!isLoggedIn) {
        toast("Unauthorized: User not logged in!", {
          icon: "⚠️",
        });
        return;
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://bitebliss-backend-ecom-api.onrender.com/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
  
        toast.success("Food deleted successfully!");
        setMenuItems(menuItems.filter((item) => item._id !== id));
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5">
      <Toaster />
      <h1 className="text-4xl font-semibold text-center pt-10 pb-6 text-orange-400">
        Manage Food Menu
      </h1>

      <div className="overflow-x-auto w-full lg:w-3/4">
        <Link to="/create" className="mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4">
            Add New Food
          </button>
        </Link>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {menuItems.map((item) => (
              <TableView
                key={item._id}
                img={item.image}
                title={item.productName}
                price={item.price}
                id={item._id}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodTable;
