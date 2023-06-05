import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const API_URL = "http://localhost:5005"

function Profile() {
  const [user, setUser] = useState('');
  const { id } = useParams();

  const getUser = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');

        let response = await axios.get(`${API_URL}/api/profile/${id}`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        setUser(response.data);
        console.log(response.data)

     
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUser();
    }, []); 


  return (
    <div>
            <img alt="profile-pic"/>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p>Logged in with: {user.email}</p>
            <p>Address: {user.address}</p>

            <Link to={`/profile/${user._id}/edit`}>
              Edit Account
            </Link>

    </div>
  );
}

export default Profile;