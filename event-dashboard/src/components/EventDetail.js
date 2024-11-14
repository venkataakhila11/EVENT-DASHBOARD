import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Card, CardContent, CardMedia, Box, Button } from '@mui/material';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event:", error.response ? error.response.data : error.message);
        navigate('/'); // Redirect to home if there's an error fetching the event
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      navigate('/'); // Redirect to home after deletion
    } catch (error) {
      console.error("Error deleting event:", error.response ? error.response.data : error.message);
    }
  };

  if (!event) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:5000/${event.imageUrl}`}
          alt={event.title}
        />
        <CardContent>
          <Typography variant="h4">{event.title}</Typography>
          <Typography variant="body1" mt={2}>{event.description}</Typography>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Date: {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">Location: {event.location}</Typography>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete Event
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetail;
