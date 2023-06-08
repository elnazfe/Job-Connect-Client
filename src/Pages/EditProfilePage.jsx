import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/auth.context';
import { Box, Button, TextField } from '@mui/material';

const API_URL = process.env.REACT_APP_SERVER_URL

function EditProfilePage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const [uploading, setUploading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const { logout, tokenUpdate } = useContext(AuthContext);

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);

  const getProfile = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      const response = await axios.get(`${API_URL}/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFirstName(response.data.firstName);
      setLastName(response.data.lastName);
      setAddress(response.data.address);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);


  const handleImageChange = (e) => {
    setUploading(true);

    const uploadData = new FormData();

    uploadData.append("profileImg", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setProfileImg(response.data.fileUrl);
        console.log(profileImg);
        setUploading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { firstName, lastName, address, profileImg };
    try {
      const storedToken = localStorage.getItem('authToken');

      await axios.put(`${API_URL}/api/profile/${id}`, body, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      setFirstName('');
      setLastName('');
      setAddress('');
      setProfileImg('')

      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      await axios.delete(`${API_URL}/api/profile/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      logout();

      navigate('/');
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <h3>Edit Account</h3>
        <div>
          <form onSubmit={handleSubmit}>
          <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
            <div>
        <TextField
          label="First Name"
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
        />
        </div>

        <div>
        <TextField
        
          label="Last Name"
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
        />
        </div>
        <div>
        <TextField
        id="outlined-error"
          label="Address"
          type="text"
          name="Street"
          value={address}
          onChange={handleAddress}
        />
        </div>
        <div>
        <TextField
        id="outlined-error"
          type="file"
          onChange={(e) => handleImageChange(e)}
          
        />
        </div>
            
        <Button variant="text" type="submit" className='add-button'>Save Changes</Button>
            </Box>
          </form>
          <Button variant="text" type="submit" onClick={deleteProfile} className='add-button'>Delete the Account ⚠️</Button>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;