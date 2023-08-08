import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateMeWithAPI } from "../redux/slices/authSlice";

function CustomerSettings() {
  const { user, updateCustError } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: user.user.name,
    phoneNumber: user.user.phoneNumber,
  });

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const updateProfile = () => {
    dispatch(updateMeWithAPI(formData, navigateTo, user.user.token));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user.user.name}'s Profile Settings
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Name:</span>{" "}
              <input
                className="border border-1 border-gray-400 px-1 rounded-md"
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <input
                type="text"
                className="border border-1 border-gray-400 px-1 rounded-md"
                value={formData.phoneNumber}
                onChange={(e) => {
                  setFormData({ ...formData, phoneNumber: e.target.value });
                }}
              />
            </li>
          </ul>
          <br />
          {updateCustError && (
            <p style={{ color: "red" }}>
              * Something went wrong! Please try again!
            </p>
          )}
          <button
            onClick={updateProfile}
            className="bg-green-500 text-white rounded-md px-1 py-1 w-1/3 mt-2"
          >
            Save
          </button>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Username:</span>{" "}
              {user.user.username}
            </li>
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${user.user.email}`}
                className="text-blue-600 hover:underline"
              >
                {user.user.email}
              </a>
            </li>
            <li>
              <span className="font-semibold">Password:</span> *****
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CustomerSettings;
