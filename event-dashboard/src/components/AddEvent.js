import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, Snackbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddEvent = ({ showSnackbar }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null,
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      await axios.post("http://localhost:5000/api/events", data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      localStorage.setItem('eventCreated', 'Event Created Successfully'); // Set notification in local storage
      setFormData({ title: '', description: '', date: '', location: '', image: null }); // Reset form

      navigate('/');
      showSnackbar('Event created successfully'); // Notify the user about the update

    } catch (error) {
      setErrorMessage(error.response ? error.response.data : error.message);
      console.error("Error creating event:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
                      <Typography variant="h4">Edit Event</Typography> {/* Example usage */}

      <TextField label="Title" name="title" onChange={handleChange} required />
      <TextField label="Description" name="description" onChange={handleChange} required multiline />
      <TextField label="Date" name="date" type="date" onChange={handleChange} InputLabelProps={{ shrink: true }} required />
      <TextField label="Location" name="location" onChange={handleChange} required />
      <input type="file" name="image" onChange={handleFileChange} required />
      <Button type="submit" variant="contained">Add Event</Button>

      {/* Snackbar for error message */}
      {errorMessage && (
        <Snackbar
          open={Boolean(errorMessage)}
          autoHideDuration={6000}
          onClose={() => setErrorMessage('')}
          message={errorMessage}
        />
      )}
    </Stack>
  );
};

export default AddEvent;
