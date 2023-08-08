import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginRegister.css"; // Import CSS file
import {
    reset,
    signInWithAPICustomer,
    signInWithAPIRestaurant,
} from "../redux/slices/authSlice";

const Login = () => {
    const [customerUsername, setCustomerUsername] = useState("");
    const [customerPassword, setCustomerPassword] = useState("");
    const [ownerEmail, setOwnerEmail] = useState("");
    const [ownerPassword, setOwnerPassword] = useState("");
    const navigate = useNavigate();
    const { restaurantAuthError, customerAuthError, restaurantUnapprovedError } =
        useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const handleCustomerSubmit = (event) => {
        event.preventDefault();
        dispatch(
            signInWithAPICustomer(customerUsername, customerPassword, navigate)
        );
    };

    const handleOwnerSubmit = (event) => {
        event.preventDefault();
        dispatch(signInWithAPIRestaurant(ownerEmail, ownerPassword, navigate));
    };

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <div>
            <div className="form-container">
                <div className="login-forms-container">
                    <div className="form-wrapper">
                        <h2>Customer Login</h2>
                        <form onSubmit={handleCustomerSubmit} className="form">
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={customerUsername}
                                    onChange={(event) => setCustomerUsername(event.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={customerPassword}
                                    onChange={(event) => setCustomerPassword(event.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            {customerAuthError && (
                                <p style={{ color: "red" }}>* Invalid Username or Password</p>
                            )}
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                        <p className="form-text">
                            Don't have an account?{" "}
                            <Link to="/register-customer">Register here</Link>.
                        </p>
                    </div>
                    <div className="form-wrapper">
                        <h2>Restaurant Owner Login</h2>
                        <form onSubmit={handleOwnerSubmit} className="form">
                            <label>
                                Username:
                                <input
                                    type="text"
                                    value={ownerEmail}
                                    onChange={(event) => setOwnerEmail(event.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            <label>
                                Password:
                                <input
                                    type="password"
                                    value={ownerPassword}
                                    onChange={(event) => setOwnerPassword(event.target.value)}
                                    className="input-field"
                                />
                            </label>
                            <br />
                            {restaurantAuthError && (
                                <p style={{ color: "red" }}>* Invalid Username or Password</p>
                            )}

                            {restaurantUnapprovedError && (
                                <p style={{ color: "red" }}>
                                    * Your restaurant isn't approved yet!
                                </p>
                            )}
                            <button type="submit" className="submit-button">
                                Submit
                            </button>
                        </form>
                        <p className="form-text">
                            Don't have an account?{" "}
                            <Link to="/register-restaurant">Register here</Link>.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
