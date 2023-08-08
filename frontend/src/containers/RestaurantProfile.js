import React from 'react'
import { useSelector } from 'react-redux';

function RestaurantProfile() {
  const user = useSelector(state => state.auth.user);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{user.user.name}'s Profile</h1>
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Email:</span>{' '}
              <a
                href={`mailto:${user.user.email}`}
                className="text-blue-600 hover:underline"
              >
                {user.user.email}
              </a>
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{' '}
              <a
                href={`tel:${user.user.phoneNumber}`}
                className="text-blue-600 hover:underline"
              >
                {user.user.phoneNumber}
              </a>
            </li>
            <li>
              <span className="font-semibold">Address:</span>{' '}
              
                {user.user.address}
           
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Account Information</h2>
          <ul className="list-disc list-inside">
            <li>
              <span className="font-semibold">Username:</span> {user.user.username}
            </li>
            <li>
              <span className="font-semibold">Password:</span> *****
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RestaurantProfile
