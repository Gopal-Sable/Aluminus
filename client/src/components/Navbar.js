import logo from '../images/mcalogo.png'
import React, { useContext } from 'react'
// import 'bootstrap/dist/css/bootstrap.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Navbar = () => {
  
  let history=useHistory()
  const handleLogout=()=>{
    localStorage.removeItem('token');
    history.push("/login")
  }
  let location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} alt="logo" style={{ marginRight: 0.5 + 'em', height: '50px', width: '50px' }} />GECA MCA
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <NavLink exact activeClassName="active-page" className="nav-link" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active-page" className="nav-link" to="/about">Profile</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active-page" className="nav-link" to="/contact">ContactUs</NavLink>
          </li>
          {!localStorage.getItem('token') ? <form className="d-flex">
          <li className="nav-item">
            <NavLink exact activeClassName="active-page" className="nav-link" to="/signin">Signin</NavLink>
          </li>
          <li className="nav-item">
            <NavLink exact activeClassName="active-page" className="nav-link" to="/signup">Register</NavLink>
          </li>
            </form>
              : <li className="nav-item">
            <NavLink exact activeClassName="active-page" onClick={handleLogout} className="nav-link" to="/signin">Logout</NavLink>
          </li>}
          </ul>
        </div>
      </nav>



    </>

  )
}
export default Navbar