import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://bitebliss-backend-ecom-api.onrender.com/api/products/${id}`
        );
        const data = response.data;
        setProductName(data.productName);
        setPrice(data.price);
        if (data.image) {
          setPreviewImage(data.image);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchProductData();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const formDataImg = new FormData();
      if (image) {
        formDataImg.append("file", image);
        formDataImg.append("upload_preset", "be-expo");
        const uploadResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/beexpo1/image/upload",
          formDataImg
        );
        const imageUrl = uploadResponse.data.secure_url;
        setPreviewImage(imageUrl);
      }

      const productData = {
        productName,
        price,
        image: previewImage,
      };

      const response = await axios.put(
        `https://bitebliss-backend-ecom-api.onrender.com/api/products/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
          },
        }
      );

      if (response.status === 200) {
        
        toast.success("Product updated successfully!");
        navigate("/menu");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Toaster />
      <div className="max-w-md bg-white p-8 rounded-md shadow-md w-full">
        {isLoading && <p className="text-center">Loading...</p>}
        {error && (
          <p className="text-red-500 text-center">Error: {error.message}</p>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center">Edit Food</h2>
          <div>
            <label htmlFor="productName" className="block mb-1">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1">
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="image" className="block mb-1">
              Product Image
            </label>
            <input
              type="file"
              id="image"
              accept=".jpg, .jpeg, .png"
              onChange={handleImageChange}
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-400"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFood;
