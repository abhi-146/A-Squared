const ContactUsUser = require('../models/contactUsUsers');

// Controller function to handle adding a new contactUsUser
exports.addContactUsUser = async (req, res) => {
    try {
      const newContactUsUser = new ContactUsUser(req.body); // Directly pass req.body to the constructor
  
      console.log('New Contact Us User:', newContactUsUser);
  
      const savedContactUsUser = await newContactUsUser.save();
      console.log('Saved Contact Us User:', savedContactUsUser);
  
      res.status(201).json(savedContactUsUser);
    } catch (error) {
      console.error('Error adding contact user:', error.message);
      res.status(500).json({ error: 'Failed to add contact user', message: error.message });
    }
  };

// Controller function to handle fetching all contactUsUsers
exports.getAllContactUsUsers = async (req, res) => {
  try {
    const contactUsUsers = await ContactUsUser.find();
    res.status(200).json(contactUsUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
