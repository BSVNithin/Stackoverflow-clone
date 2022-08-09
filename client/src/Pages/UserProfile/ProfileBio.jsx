import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const ProfileBio = ({currentProfile}) => {
    const [country,setCountry]=useState('')
    const [city,setCity]=useState('')
    const getGeoInfo = () => {
    axios.get('https://ipapi.co/json/').then((response) => {
        let data = response.data;
        setCountry(data.country_name)
        setCity(data.city);
        console.log(data)
    }).catch((error) => {
        console.log(error);
    });
};
getGeoInfo();
    return (
        <div>
            <div>
                {
                    currentProfile?.tags.length !== 0 ? (
                        <>
                            <h4>Tags watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}>{tag}</p>
                                ))
                            }
                        </>
                    ) : (
                        <p>0 tags watched</p>
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                            <h4>About</h4>
                            <p>{currentProfile?.about}</p>
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }
                Location: {city}<br></br><br></br>
                Country: {country}
            </div>
        </div>
    )
}

export default ProfileBio
