import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Favorites() {
  const user = useSelector((state) => state.auth.user);
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: { Authorization: `Bearer ${user.user.token}` },
      };
      const res = await axios.get(
        "http://localhost:5001/api/favorites",
        config
      );
      setFavourites(res.data);
    }
    fetchData();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <pre>{JSON.stringify(favourites, null, 2)}</pre> */}
      <h2 className="text-xl font-bold mb-4">Favourites</h2>
      <ul>
        {favourites?.map((favorite) => (
          <li key={favorite.place_id}>
            <Link to={`/restaurant/${favorite.place_id}`}>
              {favorite.place_id}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
