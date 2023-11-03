import React, { useState } from 'react';
import alumni from "../images/alumni1.jpg";
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: '', password: '' }); // Client-side validation errors
    const [loginError, setLoginError] = useState(''); // Login error message
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Proceed with form submission
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            if (response.status === 200) {
                // Successful login
                const json = await response.json();
                console.log(json);
                localStorage.setItem('token', json.authtoken);
                history.push("/");
            } else {
                // Invalid credentials
                setLoginError("Invalid email or password");
                console.log("Invalid email or password");
            }
        } else {
            console.log("Form contains validation errors. Please correct them.");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear client-side error for the field
    };

    const validateForm = () => {
        const errors = {};

        if (!credentials.email) {
            errors.email = "Email is required";
        } else if (!isValidEmail(credentials.email)) {
            errors.email = "Enter a valid email";
        }

        if (!credentials.password) {
            errors.password = "Password is required";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <>
            <section className="sign-in">
                <div className="container mt-5">
                    <div className="signin-content">
                        <div className="signin-img">
                            <figure>
                                <img src={alumni} alt="register-pic" />
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Create an account</NavLink>
                        </div>
                        <div className="signin-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method='POST' className="register-form" id="register-form">
                                <div className="form-group">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="text" name="email" id="email" autoComplete="off" value={credentials.email} onChange={onChange} placeholder="Email" />
                                    {errors.email && <div style={{ color: 'red' }} className="error-message ">{errors.email}</div>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off" value={credentials.password} onChange={onChange} placeholder="Password" />
                                    {errors.password && <div style={{ color: 'red' }} className="error-message">{errors.password}</div>}
                                </div>
                                {loginError && <div style={{ color: 'red' }} className="error-message">{loginError}</div>}
                                <div className="form-group form-button">
                                    <input type="submit" name="signin" id="signin" className="form-submit" value="Sign in" onClick={handleSubmit} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
