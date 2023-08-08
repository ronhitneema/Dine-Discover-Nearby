import React, { useEffect, useState } from "react";
import "../styles/RestaurantHome.css"; // import the CSS file for styling
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantPendingCalls,
  setPendingCalls,
} from "../redux/slices/authSlice";

function RestaurantHome() {
  // create some dummy data for the tables
  const followers = ["John", "Jane", "Jack", "Jill"];
  //   const callbacks = [
  //     { name: 'Joe', phone: '123-456-7890', email: 'joe@example.com' },
  //     { name: 'Kate', phone: '987-654-3210', email: 'kate@example.com' },
  //     { name: 'Mike', phone: '555-555-5555', email: 'mike@example.com' },
  //   ];
  const token = useSelector((state) => state.auth.user.user.token);
  const dispatch = useDispatch();
  const callbacks = useSelector((state) => state.auth.pendingCalls);

  const getPendingCallBacks = () => {
    console.log({ token });
    dispatch(getRestaurantPendingCalls(token));
  };
  useEffect(() => {
    getPendingCallBacks();
  }, []);

  // state to keep track of completed callbacks
  const [completedCallbacks, setCompletedCallbacks] = useState([]);

  // function to handle completing a callback
  const handleCompleteCallback = (index) => {
    // remove the completed callback from the callbacks array
    const callbackToRemove = [...callbacks].splice(index, 1)[0];
    // console.log({callbackToRemove})
    const data = [...callbacks].filter((ele) => ele.id !== callbackToRemove.id);
    dispatch(setPendingCalls(data));

    // add the completed callback to the completedCallbacks array
    setCompletedCallbacks([...completedCallbacks, callbackToRemove]);
  };

  return (
    <div className="favorites-container">
      <div className="table-container"></div>
      <div className="table-container">
        <h2>Call Backs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {callbacks?.map((callback, index) => (
              <tr key={index}>
                <td>{callback.name}</td>
                <td>{callback.phone}</td>

                <td>
                  <button onClick={() => handleCompleteCallback(index)}>
                    Completed Call Back
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-container">
        <h2>Completed Call Backs</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {completedCallbacks?.map((callback, index) => (
              <tr key={index}>
                <td>{callback.name}</td>
                <td>{callback.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RestaurantHome;
