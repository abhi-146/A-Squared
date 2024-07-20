// controllers/newsletter.controller.js
const NewsletterSubscribers = require('../models/NewsletterSubscribers');

// Create a new subscriber
exports.createSubscriber = async (req, res) => {
  try {
    const subscriber = new NewsletterSubscribers(req.body);
    await subscriber.save();
    res.status(201).send(subscriber);
  } catch (error) {
    res.status(400).send({ message: 'Error creating subscriber', error: error.message });
  }
};

// Get all subscribers
exports.getSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscribers.find();
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching subscribers', error: error.message });
  }
};

// Update a subscriber by ID
exports.updateSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubscriber = await NewsletterSubscribers.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedSubscriber) {
      return res.status(404).send({ message: 'Subscriber not found' });
    }
    res.status(200).send(updatedSubscriber);
  } catch (error) {
    res.status(400).send({ message: 'Error updating subscriber', error: error.message });
  }
};

// Delete a subscriber by ID
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubscriber = await NewsletterSubscribers.findByIdAndDelete(id);
    if (!deletedSubscriber) {
      return res.status(404).send({ message: 'Subscriber not found' });
    }
    res.status(200).send({ message: 'Subscriber deleted successfully', subscriber: deletedSubscriber });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting subscriber', error: error.message });
  }
};
