import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function CustomerGenericProfile() {
  const { username } = useParams();
  const [user, setUser] = useState({});
  console.log(username);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/users/${username}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setUser(data);
        // setLoading(false);
      });
  }, [username]);
  return (
    <div className="container mx-auto px-4 py-8">
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <h1 className="text-3xl font-bold mb-8">
        {user.customer?.name}'s Profile
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              <a
                href={`mailto:${user.customer?.email}`}
                className="text-blue-600 hover:underline"
              >
                {user.customer?.email}
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              <a
                href={`tel:${user.customer?.phoneNumber}`}
                className="text-blue-600 hover:underline"
              >
                {user.customer?.phoneNumber}
              </a>
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Username:</span>{" "}
              {user.customer?.username}
            </li>
          </ul>
        </div>
      </div>
      <p>
        <h2 className="text-xl font-bold mb-4">Favourites</h2>
        {user.favorites?.map((favorite) => (
          <div key={favorite.place_id}>
            <Link to={`/restaurant/${favorite.place_id}`}>
              {favorite.place_id}
            </Link>
          </div>
        ))}
      </p>
    </div>
  );
}

export default CustomerGenericProfile;
