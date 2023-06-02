import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
 
const API_URL = "http://localhost:5005/";

function UserDashboardPage() {
    const [users, setUser] = useState(null);
    const [jobseeker, setJobseeker] = useState(false);
    const [recruiter, setRecruiter] = useState(false);
    const { id } = useParams();

    const getUser = async () => {
        try {
          const storedToken = localStorage.getItem('authToken');

          let response = await axios.get(`${API_URL}/profile/${id}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
          });

          setUser(response.data);
          console.log(response.data)

          if (response.data.userType === 'JobSeeker') {
            setJobseeker(true);
          } else {
            setRecruiter(true);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        getUser();
      }, [id]);


    return (
      <div>
     {/*  {jobseeker && (
        <> */}
            <h1>
              Hello, {users.email} {/* {user.firsttName} */}
            </h1>

            {/* <Link to={`/profile/${user._id}`}>
              Profile
            </Link>

            <Link to={`/jobs`}>
              Dashboard
            </Link>
        </>
      )}

      {recruiter && (
        <>
            <h1>
              Hello Recruiter
            </h1>

            <h2>
              Coming Soon!
            </h2>

        </>
      )} */}
      </div>
    )}


  export default UserDashboardPage;