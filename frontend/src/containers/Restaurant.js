// make component to display restaurant info
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/RestaurantDetails.css";
import { useSelector } from "react-redux";

function RestaurantComponent() {
  const [restaurant, setRestaurant] = useState({});
  // const [loading, setLoading] = useState(true);
  const { place_id } = useParams();
  console.log(place_id);
  useEffect(() => {
    console.log("inside useEffect");
    axios
      .get(`http://localhost:5001/api/restaurant/${place_id}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setRestaurant(data);
        // setLoading(false);
      });
  }, [place_id]);
  const user = useSelector((state) => state.auth.user);
  const handleCallBack = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.user.token}` },
      };
      console.log(restaurant.place_id);
      const body = {
        place_id: restaurant.place_id,
      };
      const res = await axios.post(
        "http://localhost:5001/api/customers/callRestaurant",
        body,
        config
      );
      console.log(res);
      alert("call back successful");
      // Optionally, show a success message to the user
    } catch (error) {
      // Handle errors, e.g. show an error message to the user
    }
  };
  const handleAddFavourite = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.user.token}` },
      };
      console.log(restaurant.place_id);
      const body = {
        place_id: restaurant.place_id,
      };
      const res = await axios.post(
        "http://localhost:5001/api/favorites/",
        body,
        config
      );
      console.log(res);
      alert("Added to favorites");
      // Optionally, show a success message to the user
    } catch (error) {
      // Handle errors, e.g. show an error message to the user
    }
  };
  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  // return (
  //   // <pre>{JSON.stringify(restaurant, null, 2)}</pre>
  //   <div className="restaurant">
  //     {/* <p>
  //       <img src={restaurant.photo_reference}> </img>
  //     </p> */}
  //     <h1>{restaurant.name}</h1>
  //     <p>{restaurant.rating}</p>
  //     <p>{restaurant.formatted_phone_number}</p>
  //     <p>{restaurant.website}</p>
  //     <p>{restaurant.formatted_address}</p>
  //   </div>

  return (
    <div className="restaurant-container">
      <div className="restaurant-image-container">
        <img
          src="https://via.placeholder.com/150"
          alt="Restaurant"
          className="restaurant-image"
        />
        {/* <pre>{JSON.stringify(restaurant, null, 2)}</pre> */}
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <button
          className="add-to-favorites-button"
          onClick={handleAddFavourite}
        >
          Add to favorites
        </button>
        <button className="add-to-favorites-button" onClick={handleCallBack}>
          Call back
        </button>
      </div>
      <div className="restaurant-details-container">
        <p className="restaurant-address">{restaurant.formatted_address}</p>
        <p className="restaurant-rating">Rating: {restaurant.rating}</p>
      </div>
    </div>
  );
}

export default RestaurantComponent;
