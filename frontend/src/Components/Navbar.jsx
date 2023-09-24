import logo from '../images/mcalogo.png'
// import React ,{useContext}from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
// import { UserContext } from '../App';
const Navbar = () => {
    return (
        <>
        hi

            <li className="nav-item active">
                <a exact activeClassName="active-page" className="nav-link" to="/">Home</a>
            </li>
            <li className="nav-item">
                <a exact activeClassName="active-page" className="nav-link" to="/about">Profile</a>
            </li>
            <li className="nav-item">
                <a exact activeClassName="active-page" className="nav-link" to="/contact">ContactUs</a>
            </li>
            <li className="nav-item">
                <a exact activeClassName="active-page" className="nav-link" to="/logout">Logout</a>
            </li>
        </>
    )
}

export default Navbar