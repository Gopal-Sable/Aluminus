import React from 'react'
import img from '../images/profile.jpeg'

const Card=({data})=> {
    const {firstName,lastName,batch,email,location,contactNumber,currentCompany,Department,linkedInProfile}=data;
    return (
        <div className="card"  style={{"width": "18rem","margin":"10px"}}>
            <img src={img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{firstName+" "+lastName}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Batch - {batch} from - {location}</h6>
                    <p class="card-text">email - {email}</p>
                    <p class="card-text">Mobile no.- {contactNumber}</p>
                    <p class="card-text"></p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
        </div>
    )
}
export default Card