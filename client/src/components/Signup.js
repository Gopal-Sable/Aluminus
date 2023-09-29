
import React, { useState } from 'react'
import alumni from "../images/alumni1.jpg";
import { NavLink, useHistory } from 'react-router-dom'

const Signup = () => {
    const history = useHistory();
    const [credentials, setCredentials] = useState({
        firstName: "",
        lastName: "",
        email: "",
        batch: "", //year of batch
        password: "",
        Department: "",
        contactNumber: "",
        linkedInProfile: "",
        currentCompany: "",
        location: "",
        DomainOfWork: "",
        Designation: "",
        cpassword: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, batch, password, Department, contactNumber, linkedInProfile, currentCompany, location, DomainOfWork, Designation } = credentials;
        const response = await fetch("http://localhost:5000/api/auth/alumni", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, batch, password, Department, contactNumber, linkedInProfile, currentCompany, location, DomainOfWork, Designation })
        });
        const json = await response.json()
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken);
            history.push("/about");
            console.log("successFul");
        }
        else {
            console.log("eroorrrooro");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>

            <section className="signup">
                <div className="container mt-5">
                    <div className="signup-content">
                        <div className="signup-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" id="register-form">

                                <div className="form-group">
                                    <label htmlFor="name">
                                        <i className="zmdi zmdi-account" style={{ marginRight: 1 + 'em' }} />
                                    </label>
                                    <input type="text" name="firstName" id="firstName" autoComplete="off"
                                        value={credentials.firstName} onChange={onChange} placeholder="First Name" />
                                    <span className="input-group-addon">   </span>
                                    <input type="text" name="lastName" id="lastName" autoComplete="off"
                                        value={credentials.lastName} onChange={onChange} placeholder="Last Name" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="email">
                                        <i className="zmdi zmdi-email" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="email" name="email" id="email" autoComplete="off"
                                        value={credentials.email} onChange={onChange} placeholder="Email" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="batch">

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16" style={{ marginRight: 0.7 + 'em' }}>
                                            <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z" />
                                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                        </svg>
                                    </label>
                                    <input type="number" name="batch" id="batch" autoComplete="off" min="1995" max="2025" style={{ width: '190px' }}
                                        value={credentials.batch} onChange={onChange} placeholder="Year of Graduation" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="contactNumber">
                                        <i className="zmdi zmdi-phone" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="number" name="contactNumber" id="contactNumber" minLength={10} maxLength={10} autoComplete="off"
                                        value={credentials.contactNumber} onChange={onChange} placeholder="Contatct Number" />
                                </div>




                                <div className="form-group>">
                                    <label htmlFor="linkedInProfile">
                                        <i className="zmdi zmdi-calendar-alt" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="url" name="linkedInProfile" id="linkedInProfile" autoComplete="off"
                                        value={credentials.linkedInProfile} onChange={onChange} placeholder="LinkedIN Profile" />
                                </div>



                                <div className="form-group>">
                                    <label htmlFor="Department">
                                        <i className="zmdi zmdi-book" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="text" name="Department" id="Department" autoComplete="off"
                                        value={credentials.Department} onChange={onChange} placeholder="Department" />
                                </div>


                                <div className="form-group>">
                                    <label htmlFor="DomainOfWork">
                                        <i className="zmdi zmdi-case" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="text" name="DomainOfWork" id="DomainOfWork" autoComplete="off"
                                        value={credentials.DomainOfWork} onChange={onChange} placeholder="Domain Of Work" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="Designation">
                                        <i className="zmdi zmdi-star" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="Designation" name="Designation" id="Designation" autoComplete="off"
                                        value={credentials.Designation} onChange={onChange} placeholder="Designation" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="currentCompany">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-building" viewBox="0 0 16 16" style={{ marginRight: 0.7 + 'em' }}>
                                            <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z" />
                                            <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z" />
                                        </svg>
                                    </label>
                                    <input type="text" name="currentCompany" id="currentCompany" autoComplete="off"
                                        value={credentials.currentCompany} onChange={onChange} placeholder="Company Name" />
                                </div>

                                <div className="form-group>">
                                    <label htmlFor="location">
                                        <i className="zmdi zmdi-gps-dot" style={{ marginRight: 0.9 + 'em' }}></i>
                                    </label>
                                    <input type="text" name="location" id="location" autoComplete="off"
                                        value={credentials.location} onChange={onChange} placeholder="Address" />
                                </div>

                                {/* <div className="form-group>">
                                    <label htmlFor="about">
                                        <i className="zmdi zmdi-info" style={{ marginRight: 0.9 + 'em' }}></i>
                                    </label>
                                    <input type="about" name="about" id="about" autoComplete="off"
                                        value={credentials.about} onChange={onChange} placeholder="About" />
                                </div> */}

                                <div className="form-group>">
                                    <label htmlFor="password">
                                        <i className="zmdi zmdi-lock-outline" style={{ marginRight: 1 + 'em' }}></i>
                                    </label>
                                    <input type="password" name="password" id="password" autoComplete="off"
                                        value={credentials.password} onChange={onChange} placeholder="Password" />
                                    <span className="input-group-addon">   </span>
                                    <input type="password" name="cpassword" id="cpassword" autoComplete="off"
                                        value={credentials.cpassword} onChange={onChange} placeholder="Confirm Password" />
                                </div>

                                <div className="form-group form-button">
                                    <input type="submit" name="signup" id="signup" className="form-submit" value="register" onClick={handleSubmit} />
                                </div>
                            </form>
                        </div>
                        <div className="signup-img">
                            <figure>
                                <img src={alumni} alt="register-pic" />
                            </figure>
                            <NavLink to="/signin" className="signup-image-link">I am already registered</NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Signup

