import React, { useState, useEffect } from "react";
import DishesCard from "../layouts/DishesCard";

const Menu = () => {
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
        alert("Unauthorized: User not logged in");
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
        console.log("Product deleted successfully");
        setMenuItems(menuItems.filter((item) => item.id !== id));
        window.location.reload();
      } else {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  const handleUpdate = (_id) => {

     history.push(`/edit/${_id}`);
    console.log("Update product with id:", _id);
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

  console.log(menuItems);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center lg:px-32 px-5 ">
      <h1 className="text-4xl font-semibold text-center lg:pt-28 pt-10 pb-10 text-orange-400">
        Foods Menu
      </h1>
      <div className="flex flex-wrap gap-8 justify-center items-center mb-11 -z-50">
        {menuItems.map((item) => (
          <DishesCard
            key={item._id}
            img={item.image}
            title={item.productName}
            price={item.price}
            id={item._id}
            onDelete={() => handleDelete(item._id)}
            onUpdate={() => handleUpdate(item._id)}
            className="mb-10"
          />
        ))}
      </div>
    </div>
  );
};

export default Menu;
