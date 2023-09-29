import React,{useContext, useState} from 'react'
import alumni from "../images/alumni1.jpg"
import { NavLink, useHistory } from 'react-router-dom'
import {UserContext} from '../App';

window.alert = function() {};

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
            history.push("/");
            
        }
        else{
            console.log(json);
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }


    return(
   <>
   <section className="sign-in">
            <div className="container mt-5">
                <div className="signin-content">
                <div className="signin-img">
                            <figure>
                                <img src={alumni} alt="register-pic"/>
                            </figure>
                            <NavLink to="/signup" className="signin-image-link">Create an account</NavLink>

                        </div>
                        
                    <div className="signin-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method='POST' className="register-form" id="register-form">

                        
                            <div className="form-group>">
                                <label htmlFor="email">
                                <i class="zmdi zmdi-email" style={{marginRight:1+ 'em'}}></i>
                                </label>
                                <input type="text" name="email" id="email" autoComplete="off" value={credentials.email} onChange={onChange} placeholder="Email"/>
                            </div>
                            <div className="form-group>">
                                <label htmlFor="password">
                                <i class="zmdi zmdi-lock" style={{marginRight:1+ 'em'}}></i>
                                </label>
                                <input type="password" name="password" id="password" autoComplete="off" value={credentials.password} onChange={onChange} placeholder="Password"/>
                            </div>

                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Sign in" onClick={handleSubmit}/>
                                

                            </div>
                            
                        </form>
                        </div>
                </div>
            </div> 
        </section>

    


   </>

    )
}
export default Login