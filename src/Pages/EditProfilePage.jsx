import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/auth.context';

import { Button, TextField, Typography, Box, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
    <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Box sx={{ width: '400px', p: 3, border: '1px solid #ccc', borderRadius: '4px' }}>
        <Typography variant="h4" component="h3" sx={{ mb: 3 }}>
          Edit Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            value={address}
            onChange={handleAddress}
            sx={{ mb: 2 }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            

            <label htmlFor="image-upload">
              Image:
            </label>
            <input
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              sx={{ display: 'none' }}
            />
            <Button type="submit" variant="contained">
              Save changes
            </Button>
          </Box>
        </form>

        <Button
          variant="outlined"
          startIcon={<Delete />}
          onClick={deleteProfile}
          sx={{ color: 'red', borderColor: 'red', '&:hover': { backgroundColor: '#ffeeee' } }}
        >
          Delete Account <Box component="span" sx={{ ml: 1 }}>&#9888;</Box>
        </Button>
      </Box>
    </Box>
  );
}

export default EditProfilePage;