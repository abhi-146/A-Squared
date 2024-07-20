const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, countryCode, phone, password } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }
    // Create new user
    user = new User({ name, email, countryCode, phone, password });
    await user.save();
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('likedListings');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, countryCode, phone, likedListings, password, isAdmin } = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name,
      email,
      countryCode,
      phone,
      likedListings,
      password,
      isAdmin
    }, { new: true, runValidators: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addLikedListing = async (req, res) => {
    const { userId, listingId, listingType } = req.body;
  
    try {
      let user = await User.findById(userId);
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      // Determine the model based on listingType
      let ListingModel;
      switch (listingType) {
        case 'RentalListing':
          ListingModel = RentalListing;
          break;
        case 'CommercialListing':
          ListingModel = CommercialListing;
          break;
        case 'OffPlanListing':
          ListingModel = OffPlanListing;
          break;
        default:
          return res.status(400).json({ error: 'Invalid listing type' });
      }
  
      // Check if the listing exists
      const listing = await ListingModel.findById(listingId);
      if (!listing) return res.status(404).json({ error: 'Listing not found' });
  
      // Add the listing to likedListings if not already present
      if (!user.likedListings.includes(listingId)) {
        user.likedListings.push(listingId);
        await user.save();
      }
  
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  

exports.removeLikedListing = async (req, res) => {
  const { userId, listingId } = req.params;

  try {
    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Remove listingId from likedListings array
    user.likedListings = user.likedListings.filter(id => id.toString() !== listingId);

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
