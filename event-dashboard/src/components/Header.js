import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Event Dashboard
      </Typography>
      <Button color="inherit" component={Link} to="/" aria-label="Home">
        Home
      </Button>
      <Button color="inherit" component={Link} to="/add-event" aria-label="Add Event">
        Add Event
      </Button>
    </Toolbar>
  </AppBar>
);

export default Header;
