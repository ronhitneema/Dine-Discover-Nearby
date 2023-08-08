import React, { useEffect } from 'react';
import '../styles/Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { approveRestaurant, getAdminPendingRequests } from '../redux/slices/authSlice';

function Dashboard() {
 
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const restaurants = useSelector(state => state.auth.pendingRestaurants)
  const fetchRestaurants = async() => {
    if(user && user.user)
    dispatch(getAdminPendingRequests(user.user.token))
  }
  useEffect(() => {
    
    fetchRestaurants()
  },[]);
  useEffect(() => {
console.log({restaurants})
  })

  const handleApprove = (id) => {
    dispatch(approveRestaurant(id))
    fetchRestaurants()
  };

  return (
    <div className="dashboard-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {restaurants && restaurants.map((restaurant) => (
            <tr key={restaurant.id}>
              <td>{restaurant.id}</td>
              <td>{restaurant.name}</td>
              <td>
                <button onClick={() => handleApprove(restaurant.id)}>Approve</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;