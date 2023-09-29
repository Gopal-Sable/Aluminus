import React, { useEffect, useState, useContext } from 'react';
import profile from "../images/profile.png";
import { useHistory } from "react-router-dom";
import userContext from '../context/userContext';


const About = () => {

    const [alumni, setAlumni] = useState({});//getting data in alumni

    const host = "http://localhost:5000";

    let history = useHistory();
    const context = useContext(userContext);
    // eslint-disable-next-line 
    // const { alumni,showAlumni} = context;
    const showAlumni = async () => {
        //API Call
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const data = await response.json();
        console.log(data);
        //logic to show in client site or UI
        setAlumni(data)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            showAlumni();
        }
        else {
            history.push("/signin")
        }
        // eslint-disable-next-line
    }, [])
    /// checking if user is logged in part^^


    return (
        <>

            <div className="container emp_prrofile">
                <h1></h1>
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={profile} alt="profile" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{alumni.firstName + ' ' + alumni.lastName}</h5>
                                <h6>{alumni.DomainOfWork + ' | ' + alumni.currentCompany}</h6>
                            </div>
                        </div>

                        {/* edit profilr button */}
                        <div className="col-md-2">
                            <input type="submit" disabled className="profile-edit-btn" name="btnAddmore" value="Edit Profile" />

                        </div>

                    </div>
                    <div className="row">
                        {/* left side url */}
                        <div className="col-md-4">
                            <div className="profile-work">

                                <p>Work link</p>
                                <a href="http://github.com" target="_github">Github</a>
                                <br></br>
                                <a href="http://github.com" target="_github">Git lab</a>
                                <br></br>
                                <a href="http://github.com" target="_github">Instagram</a>
                            </div>
                        </div>


                        {/* right side data toggle */}
                        <div className="col-md-8 pl-5 about-info" >
                            <div className="row">
                                <div className="col-md-6">
                                    <label>ID</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{alumni._id}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{alumni.email}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{alumni.contactNumber}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>Location</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{alumni.location}</p>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md-6">
                                    <label>About</label>
                                </div>
                                <div className="col-md-6">
                                    {/* <p>{alumni.about}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default About