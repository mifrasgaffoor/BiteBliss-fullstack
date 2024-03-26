import React, { useState } from "react";
import { Link } from "react-router-dom";

const TableView = (props) => {
  const { img, title, price, id, onDelete } = props;
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(id);
    setShowModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <tr>
      <td className="px-4 py-3">
        <img
          src={img}
          alt={title}
          className="h-10 w-10 lg:h-12 lg:w-12 rounded-md"
        />
      </td>
      <td className="px-4 py-3 text-sm lg:text-lg">{title}</td>
      <td className="px-4 py-3 text-sm lg:text-lg">{price}</td>
      <td className="px-4 py-3 flex flex-col lg:flex-row lg:items-center">
        <Link to={`/edit/${id}`}>
          <button className="px-3 py-1 mb-2 lg:mb-0 lg:mr-2 bg-green-500 text-white rounded">
            Edit
          </button>
        </Link>
        <button
          className="px-3 py-1 bg-red-500 text-white rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto flex justify-center items-center ">
          <div className="absolute inset-0 bg-black opacity-50 "></div>
          <div className="bg-gray-200 p-4 rounded-md m-7">
            <p className="text-lg text-center mb-4 text-red-500  z-50">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center">
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 z-50"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded z-50"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default TableView;
