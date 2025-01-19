import React, { useEffect, useState } from "react";
import usePropertyStore from "../../store/property.store";
import { useNavigate, NavLink } from "react-router-dom";

const UploadedProperty = () => {
  const { userProperties, getUserProperties, deleteProperty } =
    usePropertyStore();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserProperties();
  }, []);

  const handleDeleteClick = (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    deleteProperty(propertyToDelete);
    setShowDeletePopup(false);
    setPropertyToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
    setPropertyToDelete(null);
  };

  if (userProperties.length === 0) {
    return (
      <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg h-full shadow-md hover:shadow-lg transition-all">
        <div className="flex flex-col items-center  gap-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-600 ">
            No Properties Listed Yet
          </h2>
          <NavLink
            to={"/upload"}
            className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
          >
            Add New Property
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold ">Your Listings</h2>
        <NavLink
          to="/upload"
          className="bg-green-700 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-green-800 transition-colors"
        >
          Add New
        </NavLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 max-h-[70vh] overflow-y-auto pr-2">
        {userProperties.map((listing) => (
          <div
            key={listing._id}
            className="flex flex-col gap-3 border p-3 rounded-lg hover:shadow-md transition-all hover:border-slate-300"
          >
            <img
              src={listing.images[0]}
              alt="listing cover"
              className="w-full object-cover h-[200px] rounded-lg"
              onClick={() => {
                navigate(`/properties/${listing._id}`);
              }}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
                {listing.title}
              </h3>
              <p className="text-slate-700 font-medium">
                ${listing.price.toLocaleString()}
              </p>
              <div className="flex gap-3">
                <button className="text-green-700 uppercase p-1  hover:text-green-800 font-medium transition-colors">
                  Edit
                </button>
                <button
                  className="text-red-700 uppercase p-1 hover:text-red-800 font-medium transition-colors"
                  onClick={() => handleDeleteClick(listing._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showDeletePopup && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this property?
            </h3>
            <div className="flex gap-4">
              <button
                className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
                onClick={confirmDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                onClick={cancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadedProperty;
