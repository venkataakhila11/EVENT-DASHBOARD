const express = require("express");
const multer = require("multer");
const Event = require("../models/Event");
const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Create event
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    
    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "All fields are required." });
    }
    
    const event = new Event({
      title,
      description,
      date,
      location,
      imageUrl: req.file ? req.file.path : "",
    });
    
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// Get specific event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// backend/routes/events.js

// Update event
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const { title, description, date, location } = req.body;
      const updateData = { title, description, date, location };
      
      if (req.file) {
        updateData.imageUrl = req.file.path;
      }
      
      const event = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      
      res.json(event);
    } catch (error) {
      console.error("Error updating event:", error.message);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
  // Delete event
  router.delete("/:id", async (req, res) => {
    try {
      const event = await Event.findByIdAndDelete(req.params.id);
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.json({ message: "Event deleted successfully" });
    } catch (error) {
      console.error("Error deleting event:", error.message);
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  });
  
module.exports = router;
