
// context created but not in use so do not see it it is small project so I think it is not needed here
import React, { useState } from 'react'
import UserContext from './userContext'
const AlumniState = (props) => {
    const host = "http://localhost:5000"
    const alumniInitial = [];
    const [alumni, setAlumni] = useState(alumniInitial)

    //show all Alumni
    const showAlumni = async () => {
        //API Call
        const response = await fetch(`${host}/api/auth/alumni`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        // console.log(data);
        //logic to show in client site or UI
        setAlumni(data)
    }


    return (
        <UserContext.Provider value={{alumni,showAlumni}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default AlumniState