import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateFood = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "be-expo");

      const uploadResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/beexpo1/image/upload",
        formData
      );

      const imageUrl = uploadResponse.data.secure_url;

      const productData = {
        productName,
        price,
        image: imageUrl,
      };

      await axios.post(
        "https://bitebliss-backend-ecom-api.onrender.com/api/products/createProduct",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
 toast.success("Successfully created!");
      navigate("/menu");
     
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster />
      <form
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl mb-4 font-semibold text-center text-gray-800">
          Add New Food Item 🍔
        </h2>
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
            placeholder="Enter product name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Product Image
          </label>
          <input
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            required
            className="mt-1 block w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Product Preview"
              className="mt-2 rounded-md shadow-md"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
        <button
          className="py-2 px-4 bg-orange-600 text-white rounded hover:bg-orange-700 focus:outline-none focus:bg-orange-400 w-full"
          type="submit"
        >
          Create Food
        </button>
      </form>
    </div>
  );
};

export default CreateFood;
