const TourRequest = require('../models/tourRequest');

// Controller function to add a new tour request
exports.createTourRequest = async (req, res) => {
  try {
    const {
      tourtype,
      date,
      time,
      name,
      phone,
      email,
      message
    } = req.body;

    // Create a new TourRequest object
    const newTourRequest = new TourRequest({
      tourtype,
      date,
      time,
      name,
      phone,
      email,
      message
    });

    // Save the tour request to the database
    await newTourRequest.save();

    res.status(201).json({ message: 'Tour request added successfully' });
  } catch (err) {
    console.error('Error adding tour request:', err);
    res.status(500).json({ error: 'Failed to add tour request' });
  }
};

exports.getAllTourRequests = async (req, res) => {
    try {
      const tourRequests = await TourRequest.find();
  
      res.status(200).json(tourRequests);
    } catch (err) {
      console.error('Error fetching tour requests:', err);
      res.status(500).json({ error: 'Failed to fetch tour requests' });
    }
  };