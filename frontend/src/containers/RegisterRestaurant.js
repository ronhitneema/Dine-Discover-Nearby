import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css";
import { useDispatch, useSelector } from "react-redux";
import { registerRestaurantWithAPI } from "../redux/slices/authSlice";
const RegisterRestaurant = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { restAlreadyExists } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      registerRestaurantWithAPI(
        {
          name,
          address,
          username,
          phoneNumber: phone,
          email,
          password,
        },
        navigateTo
      )
    );
  };

  return (
    <div>
      <div className="form-container">
        <h2>Register as Restaurant Owner</h2>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="input-field"
            />
          </label>
          <br />
          <label>
            Address:
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="input-field"
            />
          </label>
          <br />

          {restAlreadyExists && (
            <p style={{ color: "red" }}>* Restaurant account already exists!</p>
          )}
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <p className="form-text ml-12">
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
};

export default RegisterRestaurant;
