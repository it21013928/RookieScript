import React, { useState } from 'react';
import { useEffect } from 'react';
import Axios from '@/api/Axios';
//import './profileStyles.css'; // Include your CSS file for styling



function UserProfile() {

  const [searchResults, setSearchResults] = useState([]);
  

  useEffect(() => {
    Axios.get('api/user/getUserProfile')
      .then(response => {
        console.log(response.data); // Access the response data here
      })
      .catch(error => {
        console.error(error); // Handle any errors here
      });
  }, []);
  

  if(!profiledata){


  }


  return (
    <div className="user-profile-container">
     
      <div className="user-details-card">
      <div className="left-side">
        <div className="left-side-content">
        <h1>My Account</h1>
        <img src="user-photo.jpg" alt="User" className="user-photo" />
        </div>
      </div>
        <div>
          {/* User Details */}
          <h2>User Details</h2>
          <p>Name: {data.firstName}</p>
          <p>Email: johndoe@example.com</p>
          {/* Add more user details as needed */}
          </div>
        </div>
      <div className="right-side">
      
        <div className="user-leaderboard-card">
          {/* Leaderboard */}
          <h2>Leaderboard</h2>
          {/* Display user ranking */}
          <p>Your Rank: 5th</p>
          {/* Add more leaderboard details as needed */}
        </div>
      </div>
      <div className="bottom-cards">
        <div className="bottom-card">
          {/* Content for the first card */}
        </div>
        <div className="bottom-card">
          {/* Content for the second card */}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
