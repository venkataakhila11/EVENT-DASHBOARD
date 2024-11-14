import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, CircularProgress, Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditEvent = ({ showSnackbar }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null,
  });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setFormData({
          title: response.data.title,
          description: response.data.description,
          date: response.data.date.split('T')[0],
          location: response.data.location,
          image: null, // Keep it null for the initial fetch
        });
      } catch (error) {
        console.error("Error fetching event:", error.response ? error.response.data : error.message);
        showSnackbar('Error fetching event details'); // Notify the user about the error
      } finally {
        setLoading(false); // Set loading to false once the fetch is complete
      }
    };
    fetchEvent();
  }, [id, showSnackbar]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        data.append(key, formData[key]); // Only append if it's not null
      }
    });

    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      navigate('/');
      showSnackbar('Event updated successfully'); // Notify the user about the update
    } catch (error) {
      console.error("Error updating event:", error.response ? error.response.data : error.message);
      showSnackbar(error.response ? error.response.data : 'Error updating event'); // Show specific error message
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    ); // Loading spinner while fetching
  }

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
              <Typography variant="h4">Edit Event</Typography> {/* Example usage */}

      <TextField label="Title" name="title" value={formData.title} onChange={handleChange} required />
      <TextField label="Description" name="description" value={formData.description} onChange={handleChange} required multiline />
      <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
      <TextField label="Location" name="location" value={formData.location} onChange={handleChange} required />
      <input type="file" name="image" onChange={handleFileChange} />
      <Button type="submit" variant="contained">Update Event</Button>
    </Stack>
  );
};

export default EditEvent;
