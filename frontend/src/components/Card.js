import React from "react";
import { Link } from "react-router-dom";

const Card = ({ restaurant }) => {
  var { place_id, name, rating, user_ratings_total, vicinity, photos } =
    restaurant;
  // <pre>
  //   <code>{JSON.stringify(restaurant, null, 2)}</code>
  // </pre>;
  return (
    <Link
      to={`/restaurant/${place_id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden w-full md:w-1/3 mx-4 my-6"
    >
      {/* Image */}
      {/* <pre>
        <code>{JSON.stringify(photos, null, 2)}</code>
      </pre> */}
      <img
        className="h-64 w-full object-cover"
        src={photos[0].photo_reference}
        alt="A beautiful and cozy home"
      />

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h2 className="font-bold text-2xl mb-2">{name}</h2>

        {/* Location */}
        <p className="text-gray-700 mb-4">
          <svg
            className="inline-block w-4 h-4 mr-1 text-gray-600 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C7.16 0 3 4.03 3 9c0 4.8 4.24 9 9 9s9-4.2 9-9c0-4.97-4.16-9-9-9zm0 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          {vicinity}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <svg
            className="w-5 h-5 text-red-400 fill-current mr-2"
            viewBox="0 0 24 24"
          >
            <path d="M12 3.34l3.09 6.44 6.89.99l-4.99 4.86 1.18 6.86L12 18.35l-6.17 3.29 1.18-6.86L2.02 10.77l6.89-.99L12 3.34z" />
          </svg>
          <span className="text-gray-700 font-semibold">{rating}</span>
          <span className="text-gray-600"> ({user_ratings_total} reviews)</span>
        </div>
      </div>
    </Link>
  );
};

export default Card;
