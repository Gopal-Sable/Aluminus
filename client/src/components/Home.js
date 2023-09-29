import Card from "./Card"
import React, { useState, useEffect } from 'react'
const Home = () => {

  
    const [alumni, setAlumni] = useState([]);


    const userContact = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/alumni', {
                mathod: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data)

            setAlumni(data);


            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        userContact();
    }, []);
    return (
        <>
            <div className="row container">
                <h2>Our Alumni</h2>
                <div className="container mx-3">
                    {alumni.length === 0 && "No alumni to disply"}
                </div>

                {alumni.map((ele) => {
                    return <Card key={ele._id} data={ele} />;
                })}


            </div>

        </>

    )
}
export default Home