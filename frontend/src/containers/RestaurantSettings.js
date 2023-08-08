import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../redux/slices/authSlice";
import axios from "axios";

function RestaurantSettings() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  // Change name state
  const [name, setName] = useState(user.user.name);
  // Change phone Number state
  const [phoneNumber, setPhoneNumber] = useState(user.user.phoneNumber);
  // Change Address
  const [address, setAddress] = useState(user.user.address);

  const handleUpdateProfile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.user.token}` },
      };
      const body = {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
      };
      const res = await axios.post(
        "http://localhost:5001/api/restaurants/profile",
        body,
        config
      );
      // console.log(res.data);
      // console.log(user);
      let payload = {
        ...user,
        user: {
          ...user.user,
          name: res.data.name,
          phoneNumber: res.data.phoneNumber,
          address: address,
        },
      };
      dispatch(login(payload));
      window.href = "/restaurant/restaurant-profile";
      // Optionally, show a success message to the user
    } catch (error) {
      // Handle errors, e.g. show an error message to the user
    }
  };
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Name:</span>{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
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
              <span className="font-semibold">Phone:</span>{" "}
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="form-control"
              />
            </li>
            <li>
              <span className="font-semibold">Address:</span>{" "}
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
            </li>
          </ul>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleUpdateProfile}
          >
            Save Changes
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
              <span className="font-semibold">Password:</span> *****
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RestaurantSettings;
