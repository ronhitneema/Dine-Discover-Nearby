import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

function SearchResults() {
  const [result, setResult] = useState([]);

  const { searchTerm } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/search/${searchTerm}`)
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        setResult(data);
      });
  }, [searchTerm]);

  if (!result || result.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="flex">
           {" "}
      {result.map((restaurant) => (
        <Card key={restaurant.place_id} restaurant={restaurant} />
      ))}
    </div>
  );
}

export default SearchResults;