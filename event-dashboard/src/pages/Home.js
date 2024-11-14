import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
        setFilteredEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleSearch = ({ searchTerm, filterDate }) => {
    const filtered = events.filter((event) => {
      const matchesTitle = event.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = filterDate ? new Date(event.date).toISOString().split("T")[0] === filterDate : true;
      return matchesTitle && matchesDate;
    });
    setFilteredEvents(filtered);
  };

  const handleDelete = (id) => {
    // Update the state to remove the deleted event
    setFilteredEvents(filteredEvents.filter(event => event._id !== id));
    setEvents(events.filter(event => event._id !== id)); // Update the original events list
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      {error && (
        <Typography variant="h6" color="error" align="center" mt={4}>
          {error}
        </Typography>
      )}
      {location.state?.message && (
        <Typography variant="h6" color="success.main" align="center" mt={4}>
          {location.state.message}
        </Typography>
      )}
      <Typography variant="h4" mt={4} mb={2} align="center">Event Dashboard</Typography>
      <SearchBar onSearch={handleSearch} />
      <Grid container spacing={2}>
        {filteredEvents.map(event => (
          <Grid item xs={12} sm={6} md={4} key={event._id}>
            <EventCard event={event} onDelete={handleDelete} />
          </Grid>
        ))}
        {filteredEvents.length === 0 && (
          <Typography variant="h6" color="textSecondary" align="center" mt={4}>
            No events found.
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Home;
