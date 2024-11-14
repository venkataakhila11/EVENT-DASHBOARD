import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddEvent from './components/AddEvent';
import EventDetail from './components/EventDetail';
import EditEvent from './components/EditEvent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home showSnackbar={showSnackbar} />} />
        <Route path="/add-event" element={<AddEvent showSnackbar={showSnackbar} />} />
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/edit-event/:id" element={<EditEvent showSnackbar={showSnackbar} />} />
      </Routes>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;     