import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EventCard = ({ event, onDelete }) => {
  const handleDelete = async (e) => {
    e.stopPropagation(); // Prevents the Link onClick event from firing
    try {
      await axios.delete(`http://localhost:5000/api/events/${event._id}`);
      if (onDelete) {
        onDelete(event._id); // Notify parent to remove event from state
      }
    } catch (error) {
      console.error("Error deleting event:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <Link to={`/event/${event._id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ textDecoration: 'none', cursor: 'pointer', margin: 2 }}>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:5000/${event.imageUrl}`}
          alt={event.title}
        />
        <CardContent>
          <Typography variant="h6">{event.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary">{event.location}</Typography>
          <Button variant="contained" color="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button component={Link} to={`/edit-event/${event._id}`} variant="contained" color="primary">
            Edit
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default EventCard;
